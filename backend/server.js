require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes placeholder
app.get("/", (req, res) => res.send("Nomad-Yatri API running"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const sequelize = require("./db");

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB error:", err));
