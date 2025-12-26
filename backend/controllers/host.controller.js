const Host = require('../models/Host.model')
const User = require('../models/User.model')
const Program = require('../models/Program.model')
const Volunteer = require('../models/Volunteer.model')
const Application = require('../models/Application.model') 
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require("../utils/asyncHandler")
const uploadOnCloudinary = require("../utils/cloudinary")

const { 
  PROGRAM_CATEGORIES, 
  CATEGORY_SUBCATEGORIES 
} = require('../constants/programCategories');

exports.addHostData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.user.role !== "host") {
      throw new ApiError(403, "Only hosts can add property information");
    }
    const existingHost = await Host.findOne({ where: { userId } });

    if (existingHost) {
      throw new ApiError(400, "Host profile already exists");
    }
    const { 
      name, 
      propertyName, 
      location,
      acomodationType, 
      meals, 
      workRequired, 
      capacity, 
      contact 
    } = req.body;

    if (!name || !propertyName || !location || !acomodationType || !capacity || !contact) {
      throw new ApiError(400, "Missing required fields");
    }

    const propertyImagesFiles = req.files || [];
    
    if (propertyImagesFiles.length === 0) {
      throw new ApiError(400, "Property images are required");
    }

    console.log(`📤 Uploading ${propertyImagesFiles.length} images to Cloudinary...`);

    const propertyImages = [];

    for (const file of propertyImagesFiles) {
      try {
        const uploaded = await uploadOnCloudinary(file.buffer); 
        if (uploaded && uploaded.secure_url) { 
          propertyImages.push(uploaded.secure_url);
          console.log("✅ Uploaded:", uploaded.secure_url);
        }
      } catch (uploadError) {
        console.error("❌ Upload error:", uploadError);
        throw new ApiError(500, `Failed to upload image: ${uploadError.message}`);
      }
    }

    if (propertyImages.length === 0) {
      throw new ApiError(500, "No images were successfully uploaded");
    }

    console.log(`✅ All ${propertyImages.length} images uploaded successfully`);

    const host = await Host.create({
      userId: req.user.id,
      name, 
      propertyName, 
      location,
      acomodationType, 
      meals, 
      workRequired, 
      capacity: parseInt(capacity), 
      contact,
      propertyImages
    });

    const createdHost = await Host.findByPk(host.hostId, {
      attributes: { exclude: ['propertyImages'] }
    });

    if (!createdHost) {
      throw new ApiError(500, "Failed to save host information");
    }

    return res.status(201).json(
      new ApiResponse(201, { user: createdHost }, "Host registered successfully")
    );
    
  } catch (err) {
    console.error("❌ Error details:", err);
    console.log('Body:', req.body);
    console.log('Files:', req.files?.length || 0);
    
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message).join(', ');
      return res.status(400).json({ 
        success: false,
        message: messages 
      });
    }
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        success: false,
        message: "Contact number already exists" 
      });
    }
    
    res.status(err.statusCode || 500).json({ 
      success: false,
      message: err.message || "Internal server error" 
    });
  }
});

exports.editProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can edit their profile");
  }

  const host = await Host.findOne({ where: { userId } });
  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const {
    name,
    propertyName,
    location,
    acomodationType,
    meals,
    workRequired,
    capacity,
    contact,
  } = req.body;

  let newImages = host.propertyImages || [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      newImages.push(uploaded.url);
    }
  }

  await host.update({
    name: name || host.name,
    propertyName: propertyName || host.propertyName,
    location: location || host.location,
    acomodationType: acomodationType || host.acomodationType,
    meals: meals || host.meals,
    workRequired: workRequired || host.workRequired,
    capacity: capacity || host.capacity,
    contact: contact || host.contact,
    propertyImages: newImages,
  });

  return res.status(200).json(
    new ApiResponse(200, { host }, "Profile updated successfully")
  );
});

exports.seeApplications = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can see applications");
  }

  const host = await Host.findOne({
    where: { userId: req.user.id },
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const programs = await Program.findAll({
    where: { hostId: host.hostId },
    attributes: ["programId"],
  });

  const programIds = programs.map(p => p.programId);

  if (programIds.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, { applications: [] }, "No programs found")
    );
  }

  const applications = await Application.findAll({
    where: { programId: programIds },
    include: [
      {
        model: User,
        attributes: ["id", "email"],
        include: [
          {
            model: Volunteer,
            attributes: [
              "id",
              "name",
              "age",
              "country",
              "skills",
              "interests",
              "languages",
              "photo"
            ],
          },
        ],
      },
      {
        model: Program,
        attributes: ["programId", "title", "category", "location"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        count: applications.length,
        applications,
      },
      "Applications fetched successfully"
    )
  );
});
exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can update application status");
  }

  const { applicationId } = req.params;
  const { status } = req.body; 

  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const application = await Application.findOne({
    where: { applicationId },
    include: [{ model: Program, where: { hostId: host.hostId } }]
  });

  if (!application) {
    throw new ApiError(404, "Application not found or you don't have permission");
  }

  const validStatuses = ["pending", "accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, `Status must be one of: ${validStatuses.join(', ')}`);
  }

  await application.update({ status });

  return res.status(200).json(
    new ApiResponse(200, { application }, "Application status updated successfully")
  );
});
exports.getMyHostProfile = asyncHandler(async (req, res) => {
    const host = await Host.findOne({ where: { userId: req.user.id } });
    if (!host) throw new ApiError(404, "Host not found");

    return res.status(200).json(
        new ApiResponse(200, host, "Host profile fetched")
    );
});
module.exports = {
  addHostData: exports.addHostData,
  editProfile: exports.editProfile,
  seeApplications: exports.seeApplications,
  updateApplicationStatus: exports.updateApplicationStatus,
  getMyHostProfile: exports.getMyHostProfile
};