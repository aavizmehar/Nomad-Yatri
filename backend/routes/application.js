const express = require('express');
const router = express.Router();
const { applyProgram, updateApplication } = require('../controllers/application.controller');
const auth = require('../middleware/authMiddleware');

router.post('/', auth(['volunteer']), applyProgram);
router.put('/:id', auth(['host','admin']), updateApplication);

module.exports = router;
