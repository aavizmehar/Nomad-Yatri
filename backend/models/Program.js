const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Host = require('./Host');

const Program = sequelize.define('Program', {
  hostId: { type: DataTypes.INTEGER, allowNull: false },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  location: DataTypes.STRING,
  volunteersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  impactHours: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Program.belongsTo(Host, { foreignKey: 'hostId' });

module.exports = Program;
