const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User.model");
const Program = require("./Program.model");

const Application = sequelize.define(
  "Application",
  {
    applicationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "programs", key: "programId" },
      onDelete: "CASCADE"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE"
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending"
    }
  },
  { tableName: "applications", timestamps: true }
);

// Associations
Application.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Application, { foreignKey: "userId" });

Application.belongsTo(Program, { foreignKey: "programId" });
Program.hasMany(Application, { foreignKey: "programId" });

module.exports = Application;