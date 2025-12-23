const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, refreshAccessToken ,getCurrentUser} = require('../controllers/user.controller');
const {verifyJWT} = require("../middleware/auth.middleware")
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

module.exports = router;