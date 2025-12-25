const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, refreshAccessToken ,resetPassword,getCurrentUser, forgotPassword,changeCurrentPassword } = require('../controllers/user.controller');
const {verifyJWT} = require("../middleware/auth.middleware")
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me").get(verifyJWT, getCurrentUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

module.exports = router;