const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Program = require('./Program.model');

const Application = sequelize.define('Application', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  programId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending','approved','rejected'), defaultValue: 'pending' }
});

Application.belongsTo(User, { foreignKey: 'userId' });
Application.belongsTo(Program, { foreignKey: 'programId' });

module.exports = Application;
