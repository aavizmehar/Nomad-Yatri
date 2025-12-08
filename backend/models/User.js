const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('volunteer','host','admin'), defaultValue: 'volunteer' },
  skills: DataTypes.ARRAY(DataTypes.STRING),
  interests: DataTypes.ARRAY(DataTypes.STRING),
  languages: DataTypes.ARRAY(DataTypes.STRING),
  photo: DataTypes.STRING
});

module.exports = User;
