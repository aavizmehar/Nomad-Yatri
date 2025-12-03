const express = require("express");
const sequelize = require("./db");
const hostAuth = require("./routes/hostAuth");
const HostModel = require("./models/Host"); // <-- This just ensures the model is loaded and defined
require("dotenv").config();

const app = express();

app.use(express.json());

// routes
app.use("/api/host", hostAuth);

// sync database
sequelize.sync({force:true}).then(() => {
  console.log("Database synced");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);