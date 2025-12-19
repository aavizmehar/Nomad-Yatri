const express = require('express');
const router = express.Router();

const {
  addHostData,
  editProfile,
  seeApplications,
  updateApplicationStatus,
  getMyHostProfile
} = require('../controllers/host.controller');

const verifyJWT = require('../middleware/auth.middleware');
const upload = require("../middleware/multer.middleware");


// ADD HOST PROFILE
router.post(
  "/addHostData",
  verifyJWT,
  upload.array("propertyImages", 10),
  addHostData
);

// EDIT HOST PROFILE
router.patch(
  "/editProfile",
  verifyJWT,
  upload.array("propertyImages", 10),
  editProfile
);

// GET MY HOST PROFILE
router.get(
  "/getMyHostProfile",
  verifyJWT,
  getMyHostProfile
);


// SEE APPLICATIONS FOR HOST PROGRAMS
router.get("/seeApplications", verifyJWT, seeApplications);


// UPDATE APPLICATION STATUS
router.patch(
  "/updateApplicationStatus/:applicationId",
  verifyJWT,
  updateApplicationStatus
);

module.exports = router;
