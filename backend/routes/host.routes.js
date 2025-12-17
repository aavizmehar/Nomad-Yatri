const express = require('express');
const router = express.Router();
const {
  addHostData,
  editProfile,
  addNewProgram,
  seeAllPrograms,
  seeApplications,
  getSubcategories,      // NEW
  editProgram,           // NEW
  deleteProgram,         // NEW
  updateApplicationStatus, // NEW
  getMyHostProfile
} = require('../controllers/host.controller');

const verifyJWT = require('../middleware/auth.middleware');
const upload = require("../middleware/multer.middleware");

// HOST PROFILE ROUTES

// ADD HOST PROFILE
router.route("/addHostData").post(
  verifyJWT,
  upload.array("propertyImages", 10),
  addHostData
);

// EDIT HOST PROFILE
router.route("/editProfile").patch(
  verifyJWT,
  upload.array("propertyImages", 10),
  editProfile
);

// PROGRAM ROUTES

// ADD NEW PROGRAM
router.route("/addNewProgram").post(
  verifyJWT,
  upload.array("programImages", 5),
  addNewProgram
);

// SEE ALL PROGRAMS FOR THIS HOST
router.route("/seeAllPrograms").get(
  verifyJWT,
  seeAllPrograms
);

// EDIT A PROGRAM - NEW
router.route("/editProgram/:programId").patch(
  verifyJWT,
  upload.array("programImages", 5),
  editProgram
);

// DELETE A PROGRAM - NEW
router.route("/deleteProgram/:programId").delete(
  verifyJWT,
  deleteProgram
);

// GET SUBCATEGORIES FOR A CATEGORY - NEW
router.route("/categories/:category/subcategories").get(
  verifyJWT,
  getSubcategories
);

// APPLICATION ROUTES

// SEE APPLICATIONS FOR HOST PROGRAMS
router.route("/seeApplications").get(
  verifyJWT,
  seeApplications
);

// UPDATE APPLICATION STATUS - NEW
router.route("/updateApplicationStatus/:applicationId").patch(
  verifyJWT,
  updateApplicationStatus
);
router.route("/getMyHostProfile").get(
  verifyJWT,
  getMyHostProfile
)
module.exports = router;