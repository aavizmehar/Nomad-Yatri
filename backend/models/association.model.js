const Program = require("./Program.model");
const User =require("./User.model");
const Volunteer = require("./volunteer.model")
const  Host = require("./host.model");

Program.belongsTo(Host, { foreignKey: "hostId", onDelete: "CASCADE" });
Host.hasMany(Program, { foreignKey: "hostId" });

// In associations file
Host.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasOne(Host, { foreignKey: "userId" }); // one-to-one, not hasMany
