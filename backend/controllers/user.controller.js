const User = require('../models/User.model');
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const asyncHandler = require("../utils/asyncHandler")

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (err) {
    throw new ApiError(500, "Something wrong in generatng tokens")
  }
}
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return new ApiError(400, "All fields are required");
    }
    const existingUser = await User.findOne({where:{ email} })
    if (existingUser) {
      throw new ApiError(409, "User Already Exists")
    }
    const user = await User.create({
      email,
      password,
      role
    });
    const createdUser = await User.findByPk(user.id, {
      attributes: { exclude: ['password', 'refreshToken'] }
    })
    if (!createdUser) {
      throw new ApiError(500, "something wrong in registering user");
    }
    return res.status(201).json(
      new ApiResponse(200,
        {
          user: createdUser,
          redirectTo: `/${createdUser.role}/dashboard`
        },
        "user registered successfully"
      )
    );

  } catch (err) {
    console.error(err);

    res.status(500).json({ error: err.message });
  }
}
)

const loginUser = asyncHandler(async (req, res) => {
  // take data find user pass word check access and refresh token send cookie
  const { email, password } = req.body;
  if (!(email || password)) {
    throw new ApiError(400, "username or password not found")
  }
  const user = await User.findOne({ where: { email: email.toLowerCase() } });

  if (!user) {
    throw new ApiError(404, "User does not Exists")
  }
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(401, "invalid password Entered")
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id)
const loggedInUser = await User.findByPk(user.id, {
  attributes: { exclude: ['password', 'refreshToken'] }
});

  const options = {
    httpOnly: true,
    secure: true
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken,
          refreshToken
        },
        "User logged in successfully")
    )

})

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await user.update({ refreshToken: null });

  const options = {
    httpOnly: true,
    secure: true,
  }
  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out successfully"))
})
module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
