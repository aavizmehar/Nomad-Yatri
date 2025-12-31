const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING, unique: true, allowNull: false,
    set(value) {
      this.setDataValue('email', value.toLowerCase()); // convert to lowercase before saving
    }
  },
  google_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
   resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('volunteer', 'host', 'admin'), defaultValue: 'volunteer' },
  refreshToken: {
    type: DataTypes.STRING
  }
}, { tableName: 'users', timestamps: true });

User.beforeSave(async (user, options) => {
if (user.changed('password') && user.password) {

    console.log("Hasing password for user:", user.email); // Debug log
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});
User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}
User.prototype.generateAccessToken = function () {
  return jwt.sign({
    id: this.id,
    email: this.email,
    role: this.role
  },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
User.prototype.generateRefreshToken = function () {
  return jwt.sign({
    id: this.id
  },

    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
module.exports = User;
