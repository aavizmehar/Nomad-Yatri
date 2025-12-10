const express = require('express');
require('./config/db');
const cors = require('cors');
require('dotenv').config();
require('./models/association.model'); // import all models + associations
var cookieParser = require('cookie-parser')
 const authRoutes = require('./routes/auth');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














// const express = require('express');
// require('./config/db');
// const cors = require('cors');
// require('dotenv').config();
// require('./models/association.model'); // import all models + associations
// var cookieParser = require('cookie-parser')


// // const adminRoutes = require('./routes/admin');
//  const authRoutes = require('./routes/auth');
// // const hostRoutes = require('./routes/host');
// // const programRoutes = require('./routes/program');
// // const applicationRoutes = require('./routes/application');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // app.use('/api/admin', adminRoutes);
// app.use('/api/auth', authRoutes);
// // app.use('/api/user', authRoutes);
// // app.use('/api/host', hostRoutes);
// // app.use('/api/programs', programRoutes);
// // app.use('/api/applications', applicationRoutes);
// app.use(cookieParser);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
