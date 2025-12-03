const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Host = require("../models/Host");
require("dotenv").config();

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, PropertyName, Location, AccomodationType, Meals, WorkRequired, Capacity, Contact, password } = req.body;

    // check existing
    const exists = await Host.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create host
    await Host.create({ name, PropertyName, Location, AccomodationType, Meals, WorkRequired, Capacity, Contact, password: hashed });

    res.json({ message: "Host registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const host = await Host.findOne({ where: { email } });
    if (!host) return res.status(400).json({ message: "Email not found" });

    const valid = await bcrypt.compare(password, host.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: host.id, email: host.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Logged in", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
