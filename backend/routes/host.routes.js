const express = require('express');
const router = express.Router();
const { addHostData, seeApplications, editProfile, addNewProgram, seeAllPrograms, } = require('../controllers/host.controller');
const verifyJWT = require('../middleware/auth.middleware');
const upload = require("../middleware/multer.middleware")
router.route("/addHostData").post(
    verifyJWT,
    upload.array("propertyImages"), addHostData);

module.exports = router;