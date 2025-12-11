const Host = require('../models/host.model')
const User = require('../models/User.model')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require("../utils/asyncHandler")
const uploadOnCloudinary = require("../utils/cloudinary")

exports.addHostData = asyncHandler(
  async (req, res) => {
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
)