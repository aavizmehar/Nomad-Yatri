const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const { User } = require('../models/User.model.js');
const { Host } = require('../models/host.model.js');
const { Program } = require('../models/Program.model.js');

// All routes protected for admin
router.use(auth(['admin']));

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all hosts
router.get('/hosts', async (req, res) => {
  try {
    const hosts = await Host.findAll({ include: { model: User, attributes: ['name', 'email'] } });
    res.json(hosts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST approve host
router.post('/hosts/:id/approve', async (req, res) => {
  try {
    const host = await Host.findByPk(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });

    host.verified = true;
    await host.save();
    res.json({ message: 'Host approved', host });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
