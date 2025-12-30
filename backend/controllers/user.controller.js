const User = require('../models/User.model')
const Host = require('../models/Host.model')
const Volunteer = require('../models/Volunteer.model')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const { Op } = require("sequelize");

const asyncHandler = require("../utils/asyncHandler")
const sendAdminEmail = require("../utils/mail.helper");
const crypto = require("crypto");

const jwt = require("jsonwebtoken")
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(500, "User not found")
    }
    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (err) {
    throw new ApiError(500, "Something wrong in generating tokens")
  }
}
const registerUser = asyncHandler(async (req, res) => {
  try {
    let { email, password, role } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password || !role) {
      throw new ApiError(400, "All fields are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email address");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, "User Already Exists");
    }
    const user = await User.create({
      email,
      password,
      role
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);
    const createdUser = await User.findByPk(user.id, {
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering user");
    }
    const options = {
      httpOnly: true,
      secure: true
    };
    await sendAdminEmail(
      "New User Registered",
      `A new user with email <b>${email}</b> has joined as a <b>${role}</b>.`
    );
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          {
            user: {
              ...createdUser.toJSON(),
              hasCompletedProfile: false
            },
            accessToken,
            refreshToken,
            redirectTo: `/${role}/addInfoPage`
          },
          "User registered and logged in successfully"
        )
      );
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      error: err.message || "Internal Server Error"
    });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      throw new ApiError(404, "User does not exist. Please sign up first.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password entered");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user.id);

    const loggedInUser = await User.findByPk(user.id, {
      attributes: { exclude: ["password", "refreshToken"] }
    });

    let hasCompletedProfile = false;
    let redirectTo = "";

    if (user.role === "host") {
      const host = await Host.findOne({ where: { userId: user.id } });
      hasCompletedProfile = !!host;
      redirectTo = host ? "/host/dashboard" : "/host/addInfoPage";
    }

    if (user.role === "volunteer") {
      const volunteer = await Volunteer.findOne({ where: { userId: user.id } });
      hasCompletedProfile = !!volunteer;
      redirectTo = volunteer
        ? "/volunteer/dashboard"
        : "/volunteer/addInfoPage";
    }

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
            user: {
              ...loggedInUser.toJSON(),
              hasCompletedProfile
            },
            accessToken,
            refreshToken,
            redirectTo
          },
          "User logged in successfully"
        )
      );

  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
})
const logoutUser = asyncHandler(async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
})
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request")
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const user = await User.findByPk(decodedToken?.id)
    if (!user) {
      throw new ApiError(401, "invalid refresh token")
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used")
    }
    const options = {
      httpOnly: true,
      secure: true
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id)
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully."
        )
      )
  } catch (err) {
    throw new ApiError(401, err?.message || "invalid refresh token")
  }
})
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new ApiError(400, "Token and new password are required");
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { [Op.gt]: new Date() } // Use new Date() for compatibility
    }
  });

  if (!user) {
    throw new ApiError(400, "Token is invalid or has expired");
  }

  // 1. Set the new plain text password
  user.password = newPassword;

  // 2. Clear reset fields
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;

  // 3. Save the user. 
  // Because we used 'beforeSave' in the model, it will now hash 'newPassword' 
  // before hitting the database.
  await user.save();

  return res.json(new ApiResponse(200, {}, "Password reset successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user?.id);
  console.log(user)
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "invalid password")
  }
  user.password = newPassword
  await user.save({ validateBeforeSave: false })
  return res.status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))

})
const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
})
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return res.json(
      new ApiResponse(200, {}, "If the email exists, a reset link has been sent")
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CORS_ORIGIN}/reset-password?token=${resetToken}`;

  await sendAdminEmail(
    "Password Reset Request",
    `
      <p>You requested a password reset.</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `
  );

  return res.json(
    new ApiResponse(200, {}, "Password reset link sent to email")
  );
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  resetPassword,
  generateAccessAndRefreshTokens,
  forgotPassword
};