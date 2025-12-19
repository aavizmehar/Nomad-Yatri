const express = require('express');
const router = express.Router();

const {
  addNewProgram,
  seeAllPrograms,
  editProgram,
  deleteProgram,
  getSubcategories
} = require('../controllers/program.controller');

const verifyJWT = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// HOST PROGRAM ROUTES
router.post(
  '/',
  verifyJWT,
  upload.array('programImages', 5),
  addNewProgram
);

router.get(
  '/',
  verifyJWT,
  seeAllPrograms
);

router.patch(
  '/:programId',
  verifyJWT,
  upload.array('programImages', 5),
  editProgram
);

router.delete(
  '/:programId',
  verifyJWT,
  deleteProgram
);

router.get(
  '/categories/:category/subcategories',
  verifyJWT,
  getSubcategories
);

module.exports = router;
