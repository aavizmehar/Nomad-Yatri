const express = require('express');
const router = express.Router();
const { createProgram, getPrograms } = require('../controllers/programController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth(['host','admin']), createProgram);
router.get('/', getPrograms);

module.exports = router;
