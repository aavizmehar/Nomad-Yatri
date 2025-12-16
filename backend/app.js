const express = require('express');
require('./config/db');
const cors = require('cors');
require('dotenv').config();
require('./models/association.model');
var cookieParser = require('cookie-parser')

const app = express();

// middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser());

// routes
const userRouter = require('./routes/user.routes.js');
const hostRouter = require('./routes/host.routes.js');
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users/hosts/dashboard', hostRouter);

module.exports =app