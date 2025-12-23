require('dotenv').config();
const express = require('express');
require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import Configs & Routes
require('./models/Association.model');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const hostRouter = require('./routes/host.routes');
const volunteerRouter = require('./routes/volunteer.routes');
const programPublicRouter = require('./routes/program.public.routes');
const programHostRouter = require('./routes/program.host.routes');

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use Routes
app.use('/auth', authRouter); // All google routes now start with /auth
app.use('/api/v1/users', userRouter);
app.use('/api/v1/host', hostRouter);
app.use('/api/v1/volunteer', volunteerRouter);
app.use('/api/v1/programs', programPublicRouter);
app.use('/api/v1/host/programs', programHostRouter);

// Error Handlers... (Health, 404, Global Error)
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

module.exports = app;