const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Host = sequelize.define("Host", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PropertyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AccomodationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Meals: {
    type: DataTypes.STRING,
  },
  WorkRequired: {
    type: DataTypes.STRING,
  },
  Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Contact: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,

  }
},{timestamps:true}
);

module.exports = Host;
