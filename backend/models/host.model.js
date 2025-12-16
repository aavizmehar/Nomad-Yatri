const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Host = sequelize.define(
  "Host",
  {
    hostId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Host table's primary key
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // one host per user
      references: {
        model: "users", // references users table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acomodationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meals: {
      type: DataTypes.STRING,
    },
    workRequired: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    propertyImages: {
      type: DataTypes.ARRAY(DataTypes.STRING), // multiple image URLs
      allowNull: true,
    },
  },
  {
    tableName: "hosts",
    timestamps: true,
  }
);

module.exports = Host;
