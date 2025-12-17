const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
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
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('volunteer', 'host', 'admin'), defaultValue: 'volunteer' },
  refreshToken: {
    type: DataTypes.STRING
  }
}, { tableName: 'users', timestamps: true });


User.beforeCreate(async function (user) {
  if (user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
})
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
