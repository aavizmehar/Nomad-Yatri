const router = require('express').Router();
const passport = require('../config/passport');
const { generateAccessAndRefreshTokens } = require('../controllers/user.controller');
const Host = require('../models/Host.model');
const Volunteer = require('../models/Volunteer.model');

router.get('/google', (req, res, next) => {
    const { role } = req.query;
    // Pass the role through the state parameter to the callback
    const state = role ? Buffer.from(JSON.stringify({ role })).toString('base64') : undefined;

    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: state,
        session: false
    })(req, res, next);
});

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CORS_ORIGIN}/user/login?error=auth_failed`,
        session: false
    }),
    async (req, res) => {
        try {
            if (!req.user || !req.user.id) {
                console.error("ERROR: No user or user ID found in request after Google authentication");
                const origin = process.env.CORS_ORIGIN || "https://www.nomadyatri.com";
                return res.redirect(`${origin}/user/login?error=no_user`);
            }

            console.log(`LOG: Google Auth Success. User ID: ${req.user.id}, Email: ${req.user.email}`);

            // req.user is populated by your Passport Strategy
            const tokens = await generateAccessAndRefreshTokens(req.user.id);
            if (!tokens || !tokens.accessToken) {
                console.error("ERROR: Token generation returned null or missing accessToken for User ID:", req.user.id);
                throw new Error("TOKEN_GENERATION_FAILED");
            }

            const { accessToken, refreshToken } = tokens;

            const options = {
                httpOnly: true,
                secure: true, // Always true for Render/Production
                sameSite: 'none' // Essential for Cross-Domain Cookies
            };

            res.cookie("accessToken", accessToken, options);
            res.cookie("refreshToken", refreshToken, options);

            // Determine redirect path based on profile completion
            let redirectPath = '/dashboard'; 
            const userRole = req.user.role || 'volunteer';

            try {
                if (userRole === 'host') {
                    const hostProfile = await Host.findOne({ where: { userId: req.user.id } });
                    redirectPath = hostProfile ? '/host/dashboard' : '/host/addInfoPage';
                } else if (userRole === 'volunteer') {
                    const volunteerProfile = await Volunteer.findOne({ where: { userId: req.user.id } });
                    redirectPath = volunteerProfile ? '/volunteer/dashboard' : '/volunteer/addInfoPage';
                }
            } catch (profileError) {
                console.error("LOG: Non-fatal error checking profile status:", profileError.message);
            }

            const origin = process.env.CORS_ORIGIN || "https://www.nomadyatri.com";
            // Ensure origin doesn't have trailing slash for consistency
            const cleanOrigin = origin.replace(/\/$/, "");
            const callbackUrl = `${cleanOrigin}/auth/callback?token=${accessToken}&role=${userRole}&redirect=${encodeURIComponent(redirectPath)}`;
            
            console.log("LOG: Redirecting to frontend callback:", callbackUrl);
            res.redirect(callbackUrl);
            
        } catch (error) {
            console.error("LOG: Google Callback Exception:", error.message);
            console.error(error.stack);
            const origin = process.env.CORS_ORIGIN || "https://www.nomadyatri.com";
            res.redirect(`${origin}/user/login?error=server_error&code=${error.message === 'TOKEN_GENERATION_FAILED' ? 'token_fail' : 'internal'}`);
        }
    }
);

module.exports = router;