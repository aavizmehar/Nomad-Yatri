const express = require('express');
const router = express.Router();
const Program = require('../models/Program.model');
const Host = require('../models/host.model');
const { Op } = require('sequelize');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { PROGRAM_CATEGORIES } = require('../constants/programCategories');

// PUBLIC ROUTES 

// GET ALL PROGRAMS WITH FILTERS
router.route("/").get(asyncHandler(async (req, res) => {
  const { category, subCategory, location, page = 1, limit = 12 } = req.query;
  
  const where = { isActive: true };
  
  if (category) where.category = category;
  if (subCategory) where.subCategory = subCategory;
  if (location) {
    where.location = { [Op.iLike]: `%${location}%` };
  }

  const offset = (page - 1) * limit;

  const { rows: programs, count } = await Program.findAndCountAll({
    where,
    include: [{
      model: Host,
      attributes: ['hostId', 'name', 'propertyName']
    }],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return res.status(200).json(
    new ApiResponse(200, {
      programs,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    }, "Programs fetched successfully")
  );
}));

// GET SINGLE PROGRAM BY ID
router.route("/:programId").get(asyncHandler(async (req, res) => {
  const { programId } = req.params;

  const program = await Program.findOne({
    where: { programId, isActive: true },
    include: [{
      model: Host,
      attributes: ['hostId', 'name', 'propertyName', 'location', 'propertyImages']
    }]
  });

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { program }, "Program fetched successfully")
  );
}));

// GET PROGRAMS BY CATEGORY
router.route("/category/:category").get(asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { subCategory, page = 1, limit = 12 } = req.query;

  const validCategories = Object.values(PROGRAM_CATEGORIES);
  if (!validCategories.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  const where = { 
    category, 
    isActive: true 
  };
  
  if (subCategory) where.subCategory = subCategory;

  const offset = (page - 1) * limit;

  const { rows: programs, count } = await Program.findAndCountAll({
    where,
    include: [{
      model: Host,
      attributes: ['hostId', 'name', 'propertyName']
    }],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return res.status(200).json(
    new ApiResponse(200, {
      programs,
      category,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    }, "Programs fetched successfully")
  );
}));

module.exports = router;