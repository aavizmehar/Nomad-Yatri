const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://nomaad-backend.onrender.com/api/v1/auth/google/callback"
          : "http://localhost:5000/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        let signupRole = "volunteer";

        if (req.query.state) {
          try {
            const state = JSON.parse(
              Buffer.from(req.query.state, "base64").toString()
            );
            // Validate role
            const validRoles = ['volunteer', 'host'];
            if (state.role && validRoles.includes(state.role.toLowerCase())) {
                signupRole = state.role.toLowerCase();
            }
          } catch (parseError) {
            console.error("LOG: Error parsing state in Google Strategy:", parseError.message);
          }
        }

        console.log(`LOG: Google Login Attempt - Email: ${email}, Role: ${signupRole}`);

        let [user] = await User.findOrCreate({
          where: { email },
          defaults: {
            google_id: profile.id,
            role: signupRole,
            password: null
          }
        });

        if (!user.google_id) {
          user.google_id = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("LOG: Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);


module.exports = passport;