const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const { connectDb, sequelize } = require('../config/db'); 
const User = require('../models/User.model'); 

async function createAdmin() {
  console.log("🚀 Starting Admin Creation...");

  // 3. Safety Check: Verify the URL was loaded
  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL is undefined. Check your .env file.");
    process.exit(1);
  }

  try {
    await connectDb();
    
    const [admin, created] = await User.findOrCreate({
      where: { email: 'admin@nomadyatri.com' },
      defaults: {
        password: 'admin123',
        role: 'admin'
      }
    });

    if (created) {
      console.log("✅ Admin created successfully: admin@nomadyatri.com / admin123");
    } else {
      console.log("ℹ️ Admin already exists in the database. Updating password to ensure access...");
      admin.password = 'admin123';
      await admin.save();
      console.log("✅ Admin password updated to: admin123");
    }
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Connection closed.');
    process.exit();
  }
}

createAdmin();