const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // ❌ DO NOT use alter:true in production
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('🔁 DB synced (dev only)');
    } else {
      console.log('🚀 Production mode: skipping sync');
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

connectDb();

module.exports = sequelize;
