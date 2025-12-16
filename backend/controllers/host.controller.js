const Host = require('../models/host.model')
const User = require('../models/User.model')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require("../utils/asyncHandler")
const uploadOnCloudinary = require("../utils/cloudinary")

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
// --------------------------------------------------------
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

// 3️⃣ ADD NEW PROGRAM
// --------------------------------------------------------
exports.addNewProgram = asyncHandler(async (req, res) => {
  if (req.user.role !== "host") {
    throw new ApiError(403, "Only hosts can add programs");
  }

  const host = await Host.findOne({
    where: { userId: req.user.id }
  });

  if (!host) {
    throw new ApiError(400, "Host profile not found");
  }

  const { title, description, category, location } = req.body;

  if (!title || !description || !category) {
    throw new ApiError(400, "Missing required fields");
  }

  const programImages = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploaded = await uploadOnCloudinary(file.path);
      programImages.push(uploaded.url);
    }
  }

  const program = await Program.create({
    hostId: host.hostId,
    title,
    description,
    category,
    location,
    programImages
  });

  return res.status(201).json(
    new ApiResponse(200, { program }, "Program created successfully")
  );
});

// 4️⃣ SEE ALL PROGRAMS OF THIS HOST
// --------------------------------------------------------
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
    new ApiResponse(200, programs, "Programs fetched successfully")
  );
});

// 5️⃣ SEE APPLICATIONS FOR HOST'S PROGRAMS
// --------------------------------------------------------
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

  const programIds = programs.map(p => p.id || p.programId);

  if (programIds.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "No programs or applications found")
    );
  }

  const applications = await Application.findAll({
    where: { programId: programIds },
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Program }
    ],
    order: [["createdAt", "DESC"]]
  });

  return res.status(200).json(
    new ApiResponse(200, applications, "Applications fetched successfully")
  );
});