const express = require('express');
const router = express.Router();
const { registerHost, approveHost } = require('../controllers/hostController');
const auth = require('../middleware/authMiddleware');

router.post('/register', auth(['host','admin']), registerHost);
router.put('/approve/:hostId', auth(['admin']), approveHost);

module.exports = router;
