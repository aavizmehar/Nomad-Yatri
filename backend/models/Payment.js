const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Payment = sequelize.define('Payment', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  plan: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  status: { type: DataTypes.ENUM('pending','completed','failed') },
  razorpayPaymentId: DataTypes.STRING
});

Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Payment;
