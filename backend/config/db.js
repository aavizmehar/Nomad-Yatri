const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const connectDb = async () => {
  try {
   await sequelize.authenticate()
      .then(() => console.log('Database connected'))
      .catch(err => console.error('DB connection error:', err));

    await sequelize.sync()
      .then(() => console.log('DB synced with all models'))
      .catch(err => console.error('DB sync error:', err));

  } catch (error) {
    console.log("couldn't connect database in db.js")
  }
}
connectDb();
module.exports = sequelize;
