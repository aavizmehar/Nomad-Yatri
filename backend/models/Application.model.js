const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User.model');
const Program = require('./Program.model');

const Application = sequelize.define('Application', {
  applicant
  
  
  : { type: DataTypes.INTEGER, allowNull: false },
  programId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending','approved','rejected'), defaultValue: 'pending' }
});

Application.belongsTo(User, { foreignKey: 'userId' });
Application.belongsTo(Program, { foreignKey: 'programId' });

module.exports = Application;
