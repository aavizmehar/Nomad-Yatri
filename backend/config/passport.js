const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value.toLowerCase();
        let signupRole = 'volunteer';
        
        if (req.query.state) {
            const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
            signupRole = state.role || 'volunteer';
        }

        let [user] = await User.findOrCreate({
            where: { email },
            defaults: { google_id: profile.id, role: signupRole }
        });

        if (!user.google_id) {
            user.google_id = profile.id;
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;