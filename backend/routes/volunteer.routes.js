const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");

const {
  addOrUpdateProfile,
  getProfile,
  applyToProgram,
  getMyApplications
} = require("../controllers/volunteer.controller");

const {verifyJWT} = require("../middleware/auth.middleware");

// Volunteer profile
router.post("/profile", verifyJWT, upload.single('photo'), addOrUpdateProfile);
router.get("/profile", verifyJWT, getProfile);

// Applications
router.post("/apply", verifyJWT, applyToProgram);
router.get("/applications", verifyJWT, getMyApplications);

module.exports = router;
