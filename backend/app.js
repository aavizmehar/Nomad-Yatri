require('dotenv').config();
const express = require('express');
const { connectDb } = require('./config/db');
connectDb();
const cors = require('cors');
const passport = require('passport');
require('./models/Association.model');
var cookieParser = require('cookie-parser')
const allowedOrigins = [
    "https://www.nomadyatri.com",
    "https://nomadyatri.com",
    "http://localhost:3000"
];
const app = express();

// Middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// routes
const userRouter = require('./routes/user.routes.js');
const hostRouter = require('./routes/host.routes.js');
const volunteerRouter = require('./routes/volunteer.routes.js');
const programPublicRouter = require('./routes/program.public.routes.js');
const programHostRouter = require('./routes/program.host.routes.js');
const adminRouter = require('./routes/admin.routes.js');
const contactRouter = require('./routes/contact.routes.js');
const authRouter = require('./routes/auth.routes.js');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/host', hostRouter);
app.use('/api/v1/volunteer', volunteerRouter);
app.use('/api/v1/programs', programPublicRouter);
app.use('/api/v1/host/programs', programHostRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/auth', authRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;