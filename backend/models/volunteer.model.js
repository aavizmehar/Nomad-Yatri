const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
   userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
  references: {
    model: "users",
    key: "id",
  }
},
    name: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    country: DataTypes.STRING,
    skills: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    interests: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    languages: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    photo: DataTypes.STRING,
    contact: { type: DataTypes.STRING, allowNull: true },
},{tableName: 'volunteers',timestamps: true });

module.exports = Volunteer;