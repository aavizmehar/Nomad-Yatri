const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');

const adminRoutes = require('./routes/admin');
require('dotenv').config();

require('./models/association.model')
const authRoutes = require('./routes/auth');
const hostRoutes = require('./routes/host');
const programRoutes = require('./routes/program');
const applicationRoutes = require('./routes/application');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/applications', applicationRoutes);

sequelize.sync({alter:true}).then(() => console.log('DB synced'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
