const Program = require('../models/Program.model');
const Host = require('../models/Host.model');
const { Op } = require('sequelize');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const uploadOnCloudinary = require('../utils/cloudinary');
const { 
  PROGRAM_CATEGORIES,
  CATEGORY_SUBCATEGORIES
} = require('../constants/programCategories');
/**
 * GET ALL PROGRAMS WITH FILTERS
 * GET /api/v1/programs
 */
exports.getAllPrograms = asyncHandler(async (req, res) => {
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
    include: [
      {
        model: Host,
        attributes: ['hostId', 'name', 'propertyName']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        programs,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      },
      "Programs fetched successfully"
    )
  );
});

/**
 * GET SINGLE PROGRAM BY ID
 * GET /api/v1/programs/:programId
 */
exports.getProgramById = asyncHandler(async (req, res) => {
  const { programId } = req.params;

  const program = await Program.findOne({
    where: { programId, isActive: true },
    include: [
      {
        model: Host,
        attributes: ['hostId', 'name', 'propertyName', 'location', 'propertyImages']
      }
    ]
  });

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  return res.status(200).json(
    new ApiResponse(200, { program }, "Program fetched successfully")
  );
});

/**
 * GET PROGRAMS BY CATEGORY
 * GET /api/v1/programs/category/:category
 */
exports.getProgramsByCategory = asyncHandler(async (req, res) => {
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
    include: [
      {
        model: Host,
        attributes: ['hostId', 'name', 'propertyName']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        programs,
        category,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      },
      "Programs fetched successfully"
    )
  );
});

// 3️⃣ ADD NEW PROGRAM - UPDATED VERSION
exports.addNewProgram = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can add programs");
  }

  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(400, "Host profile not found. Please complete your host profile first.");
  }

  const { 
    title, 
    description, 
    category, 
    subCategory,  // NEW
    location,
    duration,     // NEW
    maxVolunteers // NEW
  } = req.body;

  // Validate required fields
  if (!title || !description || !category) {
    throw new ApiError(400, "Title, description, and category are required");
  }

  // Validate category
  const validCategories = Object.values(PROGRAM_CATEGORIES);
  if (!validCategories.includes(category)) {
    throw new ApiError(400, `Invalid category. Must be one of: ${validCategories.join(', ')}`);
  }

  // Validate subCategory if provided
  if (subCategory) {
    const allowedSubCategories = CATEGORY_SUBCATEGORIES[category] || [];
    if (allowedSubCategories.length > 0 && !allowedSubCategories.includes(subCategory)) {
      throw new ApiError(400, `Invalid subcategory for ${category}`);
    }
    
    // If category doesn't support subcategories, ignore it
    if (allowedSubCategories.length === 0) {
      throw new ApiError(400, `${category} does not support subcategories`);
    }
  }

  // Handle image uploads
 // Handle image uploads
const programImages = [];
if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    // Check if buffer exists (memoryStorage uses .buffer, NOT .path)
    if (!file.buffer) {
      console.error("File buffer is missing for:", file.originalname);
      continue;
    }

    try {
      // Pass the BUFFER to your Cloudinary function
      const uploaded = await uploadOnCloudinary(file.buffer); 
      
      if (uploaded && uploaded.url) {
        programImages.push(uploaded.url);
      }
    } catch (uploadError) {
      console.error("Cloudinary Upload Failed:", uploadError.message);
      // Optional: stop the whole process or just skip this image
    }
  }
}

  // Create program
  const program = await Program.create({
    hostId: host.hostId,
    title,
    description,
    category,
    subCategory: subCategory || null,
    location: location || null,
    duration: duration || null,
    maxVolunteers: maxVolunteers || null,
    programImages,
    isActive: true
  });

  return res.status(201).json(
    new ApiResponse(201, { program }, "Program created successfully")
  );
});

// 3.5️⃣ GET AVAILABLE SUBCATEGORIES FOR A CATEGORY
exports.getSubcategories = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const validCategories = Object.values(PROGRAM_CATEGORIES);
  if (!validCategories.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  const subcategories = CATEGORY_SUBCATEGORIES[category] || [];
  
  return res.status(200).json(
    new ApiResponse(200, { 
      category,
      subcategories,
      hasSubcategories: subcategories.length > 0
    }, "Subcategories fetched successfully")
  );
});

// 4️⃣ SEE ALL PROGRAMS OF THIS HOST
exports.seeAllPrograms = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can view their programs");
  }

  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const programs = await Program.findAll({
    where: { hostId: host.hostId },
    order: [["createdAt", "DESC"]]
  });

  return res.status(200).json(
    new ApiResponse(200, { programs, count: programs.length }, "Programs fetched successfully")
  );
});

// 4.5️⃣ EDIT A PROGRAM
exports.editProgram = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can edit programs");
  }

  const { programId } = req.params;
  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const program = await Program.findOne({
    where: { 
      programId,
      hostId: host.hostId 
    }
  });

  if (!program) {
    throw new ApiError(404, "Program not found or you don't have permission to edit it");
  }

  const {
    title,
    description,
    category,
    subCategory,
    location,
    duration,
    maxVolunteers,
    isActive
  } = req.body;

  // Handle new images
  let updatedImages = program.programImages || [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      updatedImages.push(uploaded.url);
    }
  }

  await program.update({
    title: title || program.title,
    description: description || program.description,
    category: category || program.category,
    subCategory: subCategory !== undefined ? subCategory : program.subCategory,
    location: location || program.location,
    duration: duration || program.duration,
    maxVolunteers: maxVolunteers || program.maxVolunteers,
    isActive: isActive !== undefined ? isActive : program.isActive,
    programImages: updatedImages
  });

  return res.status(200).json(
    new ApiResponse(200, { program }, "Program updated successfully")
  );
});

// 4.6️⃣ DELETE A PROGRAM
exports.deleteProgram = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can delete programs");
  }

  const { programId } = req.params;
  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const program = await Program.findOne({
    where: { 
      programId,
      hostId: host.hostId 
    }
  });

  if (!program) {
    throw new ApiError(404, "Program not found or you don't have permission to delete it");
  }

  await program.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Program deleted successfully")
  );
});
