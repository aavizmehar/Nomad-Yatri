const express = require('express');
require('./config/db');
const cors = require('cors');
require('dotenv').config();
require('./models/association.model');
var cookieParser = require('cookie-parser')

const app = express();

// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser());

// routes
const userRouter = require('./routes/user.routes.js');
const hostRouter = require('./routes/host.routes.js');
const programRouter = require('./routes/program.routes.js');  // ✅ NEW

app.use('/api/v1/users', userRouter);
app.use('/api/v1/users/hosts/dashboard', hostRouter);
app.use('/api/v1/programs', programRouter);  // ✅ NEW - Public program routes

// Health check route (optional but recommended)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;