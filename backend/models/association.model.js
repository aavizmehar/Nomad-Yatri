const Host = require('./host.model');
const Program = require("./Program.model.js")

Program.belongsTo(Host, { foreignKey: 'hostId' });
Host.hasMany(Program, { foreignKey: "hostId" });
