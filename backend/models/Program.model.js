const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Program = sequelize.define('Program', {
  programId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true 
  },
  hostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hosts',
      key: 'hostId'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
  // Main category (1 of 6)
  category: {
    type: DataTypes.ENUM(
      'Volunteer Programs',
      'Work Exchange Stays',
      'Digital Nomad Stays',
      'Rural Homestays',
      'Eco Projects',
      'Cultural Experiences'
    ),
    allowNull: false
  },
  
  // Sub-category (optional, only for certain categories)
  subCategory: {
    type: DataTypes.STRING,
    allowNull: true // Not all categories have subcategories
  },
  
  location: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.STRING
  },
  volunteersCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  impactHours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  programImages: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  hostRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  
  // Additional fields you might need
  maxVolunteers: {
    type: DataTypes.INTEGER
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'programs',
  timestamps: true
});
module.exports = Program;