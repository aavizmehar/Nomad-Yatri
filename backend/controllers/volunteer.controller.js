const Volunteer = require('../models/Volunteer.model');
const Application = require('../models/Application.model');
const Program = require('../models/Program.model');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const uploadOnCloudinary = require('../utils/cloudinary');

// Add or update volunteer profile
exports.addOrUpdateProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== "volunteer") {
    throw new ApiError(403, "Only volunteers can perform this action");
  }

  const userId = req.user.id;

  // Check if user already has a volunteer profile
  let volunteer = await Volunteer.findOne({ where: { userId } });

  let { name, age, country, skills, interests, languages, photo, contact } = req.body;

  // Handle photo upload if file exists
  if (req.file) {
    try {
      const uploaded = await uploadOnCloudinary(req.file.buffer);
      if (uploaded && uploaded.secure_url) {
        photo = uploaded.secure_url;
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      // Optionally continue without photo or throw error
    }
  }

  if (!volunteer) {
    // Create new
    volunteer = await Volunteer.create({
      userId,
      name,
      age,
      country,
      skills,
      interests,
      languages,
      photo,
      contact
    });
  } else {
    // Update existing
    await volunteer.update({
      name: name || volunteer.name,
      age: age || volunteer.age,
      country: country || volunteer.country,
      skills: skills || volunteer.skills,
      interests: interests || volunteer.interests,
      languages: languages || volunteer.languages,
      photo: photo || volunteer.photo,
      contact: contact || volunteer.contact
    });
  }

  res.status(200).json(new ApiResponse(200, { volunteer }, 'Volunteer profile saved successfully'));
});

// Get volunteer profile
exports.getProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== "volunteer") {
    throw new ApiError(403, "Only volunteers can perform this action");
  }

  const volunteer = await Volunteer.findOne({ where: { userId: req.user.id } });
  if (!volunteer) throw new ApiError(404, 'Volunteer profile not found');

  res.status(200).json(new ApiResponse(200, { volunteer }, 'Volunteer profile fetched successfully'));
});

// Apply to a program
exports.applyToProgram = asyncHandler(async (req, res) => {
  if (req.user.role !== "volunteer") {
    throw new ApiError(403, "Only volunteers can perform this action");
  }

  const userId = req.user.id;
  const { programId } = req.body;

  if (!programId) throw new ApiError(400, 'programId is required');

  // Check if program exists
  const program = await Program.findByPk(programId);
  if (!program) throw new ApiError(404, 'Program not found');

  if (!program.isActive) {
    throw new ApiError(400, "This program is no longer accepting applications");
  }

  if (program.maxVolunteers && program.volunteersCount >= program.maxVolunteers) {
    throw new ApiError(400, "Program is already full");
  }

  // Check if already applied
  const existingApplication = await Application.findOne({ where: { programId, userId } });
  if (existingApplication) throw new ApiError(400, 'Already applied to this program');

  const application = await Application.create({
    programId,
    userId,
    status: 'pending'
  });

  res.status(201).json(new ApiResponse(201, { application }, 'Applied to program successfully'));
});

// Get volunteer applications
exports.getMyApplications = asyncHandler(async (req, res) => {
  if (req.user.role !== "volunteer") {
    throw new ApiError(403, "Only volunteers can perform this action");
  }

  const applications = await Application.findAll({
    where: { userId: req.user.id },
    include: [
      { model: Program, attributes: ['programId', 'title', 'category', 'location'] },
    ],
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json(new ApiResponse(200, { applications }, 'Applications fetched successfully'));
});