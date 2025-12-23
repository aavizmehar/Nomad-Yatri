const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
        if (!token) throw new ApiError(401, "Unauthorized request");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findByPk(decodedToken?.id, {
            attributes: { exclude: ["password", "refreshToken"] }
        });

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (err) {
        throw new ApiError(401, err?.message || "Invalid token access");
    }
})
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "You do not have permission to perform this action");
        }
        next();
    };
};
module.exports = { verifyJWT, authorizeRoles };