const express = require('express');
const router = express.Router();
const {
  addHostData,
  seeApplications,
  editProfile,
  addNewProgram,
  seeAllPrograms
} = require('../controllers/host.controller');

const verifyJWT = require('../middleware/auth.middleware');
const upload = require("../middleware/multer.middleware");

// ADD HOST PROFILE
router.route("/addHostData").post(
  verifyJWT,
  upload.array("propertyImages"),
  addHostData
);

// EDIT HOST PROFILE
router.route("/editProfile").patch(
  verifyJWT,
  upload.array("propertyImages"),
  editProfile
);

// ADD NEW PROGRAM
router.route("/addNewProgram").post(
  verifyJWT,
  upload.array("programImages"),
  addNewProgram
);

// SEE ALL PROGRAMS FOR THIS HOST
router.route("/seeAllPrograms").get(
  verifyJWT,
  seeAllPrograms
);

// SEE APPLICATIONS FOR HOST PROGRAMS
router.route("/seeApplications").get(
  verifyJWT,
  seeApplications
);

module.exports = router;
