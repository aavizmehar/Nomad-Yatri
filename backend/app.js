require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/user.model'); // Ensure this path is correct
const cors = require('cors');
require('./models/association.model');
var cookieParser = require('cookie-parser')

// GOOGLE
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });


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
// Session middleware (needed by passport)
app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// google
// Passport serialize/deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      // .get({ plain: true }) converts the Sequelize instance to a standard JS object
      done(null, user.get({ plain: true }));
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});
// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true, // <--- Add this
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        
        // Extract role from state
        let signupRole = 'volunteer'; // default
        if (req.query.state) {
          const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
          signupRole = state.role || 'volunteer';
        }

        let user = await User.findOne({ where: { email: email } });

        if (user) {
          if (!user.google_id) {
            user.google_id = profile.id;
            await user.save();
          }
        } else {
          // Use the signupRole captured from the button clicked
          user = await User.create({
            email: email,
            google_id: profile.id,
            role: signupRole, 
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);



// routes
const userRouter = require('./routes/user.routes.js');
const hostRouter = require('./routes/host.routes.js');
const volunteerRouter = require('./routes/volunteer.routes.js');
const programPublicRouter = require('./routes/program.public.routes.js');  // ✅ NEW
const programHostRouter = require('./routes/program.host.routes.js');  // ✅ NEW


app.use('/api/v1/users', userRouter);
app.use('/api/v1/host', hostRouter);
app.use('/api/v1/volunteer', volunteerRouter);
app.use('/api/v1/programs', programPublicRouter);
app.use('/api/v1/host/programs', programHostRouter);

// google routes
// Routes
app.get('/auth/google', (req, res, next) => {
  const { role } = req.query; // Capture ?role=host or ?role=volunteer
  
  // Encode the role into the state parameter
  const state = role ? Buffer.from(JSON.stringify({ role })).toString('base64') : undefined;

  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    state: state 
  })(req, res, next);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    // req.user contains the user object returned from the strategy
    const role = req.user.role;

    if (role === 'host') {
      res.redirect('http://localhost:3000/host/dashboard');
    } else if (role === 'admin') {
      res.redirect('http://localhost:3000/admin/dashboard');
    } else {
      // Default for volunteers
      res.redirect('http://localhost:3000/volunteer/dashboard');
    }
  }
);
// google sessions 

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