const express = require('express');
const router = express.Router();

const {
  getAllPrograms,
  getProgramById,
  getProgramsByCategory
} = require('../controllers/program.controller');

// PUBLIC ROUTES
router.get('/', getAllPrograms);
router.get('/category/:category', getProgramsByCategory);
router.get('/:programId', getProgramById);

module.exports = router;