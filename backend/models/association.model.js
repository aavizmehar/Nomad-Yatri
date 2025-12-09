const Program = require("./Program.model");
const User =require("./User.model");
const Volunteer = require("./volunteer.model")
const  Host = require("./host.model");

Program.belongsTo(Host, { foreignKey: 'hostId' });
Host.hasMany(Program, { foreignKey: "hostId" });

Volunteer.belongsTo(User,{foreignKey:"userId"});
User.hasMany(Volunteer,{foreignKey:"userId"});

Host.belongsTo(User,{foreignKey:"userId"});
User.hasMany(Host,{foreignKey:"userId"});