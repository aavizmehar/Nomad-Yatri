const Program = require("./Program.model");
const User = require("./User.model");
const Volunteer = require("./Volunteer.model");
const Host = require("./Host.model");
const Application = require("./Application.model");

/* ===============================
   User ↔ Host (one-to-one)
================================ */
User.hasOne(Host, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Host.belongsTo(User, {
  foreignKey: "userId",
});

/* ===============================
   User ↔ Volunteer (one-to-one)
================================ */
User.hasOne(Volunteer, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Volunteer.belongsTo(User, {
  foreignKey: "userId",
});

/* ===============================
   Host ↔ Program (one-to-many)
================================ */
Host.hasMany(Program, {
  foreignKey: "hostId",
  onDelete: "CASCADE",
});

Program.belongsTo(Host, {
  foreignKey: "hostId",
});

/* ===============================
   Program ↔ Application (one-to-many)
================================ */
Program.hasMany(Application, {
  foreignKey: "programId",
  onDelete: "CASCADE",
});

Application.belongsTo(Program, {
  foreignKey: "programId",
});

/* ===============================
   User ↔ Application (one-to-many)
   (Volunteer applies as a User)
================================ */
User.hasMany(Application, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Application.belongsTo(User, {
  foreignKey: "userId",
});
