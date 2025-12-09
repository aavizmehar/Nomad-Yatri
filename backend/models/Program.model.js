const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Program = sequelize.define('Program', {
  hostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Hosts",
      key: "id"
    }
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  location: DataTypes.STRING,
  volunteersCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  impactHours: { type: DataTypes.INTEGER, defaultValue: 0 }
});


module.exports = Program;
