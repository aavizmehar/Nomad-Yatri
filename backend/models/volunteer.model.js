const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
    volunteerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
},{tableName: 'volunteers',timestamps: true });

module.exports = Volunteer;