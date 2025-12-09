const express = require('express');
const router = express.Router();
const { registerHost, approveHost, getAllHosts } = require('../controllers/hostController');
const auth = require('../middleware/authMiddleware');

// get all hosts
// router.get('/', auth(['admin']), getAllHosts);    TO SEE ALL HOSTS ONLY FOR ADMIN
// eVERYONE CAN SEE ALL HOSTS
router.get('/all', getAllHosts);
router.post('/register', registerHost);
router.put('/approve/:hostId', auth(['admin']), approveHost);

module.exports = router;
