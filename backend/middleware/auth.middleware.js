const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError(401, "unauthorized request");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decodedToken?.id, {
      attributes:
        { exclude: ["password", "refreshToken"] }
    })
    if (!user) {
      throw new ApiError(401, "invalid access Token")
    }
    req.user = user;
    next()
  } catch (err) {
    throw new ApiError(401, err?.message || "invalid token access")
  }
})
// const auth = (roles = []) => {
//   return (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) throw new ApiError(401, "unauthorized request");

//     try {
//       const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ error: 'Forbidden' });
//       }
//       req.user = decoded;
//       next();
//     } catch (err) {
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   };
// };

module.exports = verifyJWT;
