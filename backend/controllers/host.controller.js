const Host = require('../models/host.model')
const User = require('../models/User.model')
const Program = require('../models/Program.model') // Add this import
const Application = require('../models/Application.model') // Add this import
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require("../utils/asyncHandler")
const uploadOnCloudinary = require("../utils/cloudinary")

// Import your category constants
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
    const { name, propertyName, location,
      acomodationType, meals, workRequired, capacity, contact
    } = req.body;

    const propertyImagesPath = req.files || [];
    const propertyImagesLocalPaths = propertyImagesPath.map(file => file.path);
    if (propertyImagesLocalPaths.length == 0) {
      throw new ApiError(400, "property images needed")
    }
    const propertyImages = [];

    for (const path of propertyImagesLocalPaths) {
      const uploaded = await uploadOnCloudinary(path);
      propertyImages.push(uploaded.url);   // or uploaded.secure_url
    }

    const host = await Host.create({
      userId: req.user.id,
      name, propertyName, location,
      acomodationType, meals, workRequired, capacity, contact,
      propertyImages
    });
    const createdHost = await Host.findByPk(host.hostId, {
      attributes: { exclude: ['propertyImages'] }
    })
    if (!createdHost) {
      throw new ApiError(500, "something wrong in saving Host info");
    }
    return res.status(201).json(
      new ApiResponse(200,
        {
          user: createdHost,
        },
        "user registered successfully"
      )
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
)

// 2️⃣ EDIT HOST PROFILE
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
  const programImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      programImages.push(uploaded.url);
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

// 5️⃣ SEE APPLICATIONS FOR HOST'S PROGRAMS
exports.seeApplications = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can see applications");
  }

  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(404, "Host profile not found");
  }

  const programs = await Program.findAll({
    where: { hostId: host.hostId }
  });

  const programIds = programs.map(p => p.programId);

  if (programIds.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "No programs or applications found")
    );
  }

  const applications = await Application.findAll({
    where: { programId: programIds },
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Program, attributes: ["programId", "title", "category"] }
    ],
    order: [["createdAt", "DESC"]]
  });

  return res.status(200).json(
    new ApiResponse(200, { applications, count: applications.length }, "Applications fetched successfully")
  );
});

// 5.5️⃣ UPDATE APPLICATION STATUS
exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can update application status");
  }

  const { applicationId } = req.params;
  const { status } = req.body; // "accepted", "rejected", "pending"

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
  addNewProgram: exports.addNewProgram,
  getSubcategories: exports.getSubcategories,
  seeAllPrograms: exports.seeAllPrograms,
  editProgram: exports.editProgram,
  deleteProgram: exports.deleteProgram,
  seeApplications: exports.seeApplications,
  updateApplicationStatus: exports.updateApplicationStatus,
  getMyHostProfile: exports.getMyHostProfile
};