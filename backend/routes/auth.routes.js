const router = require('express').Router();
const passport = require('../config/passport');
const { generateAccessAndRefreshTokens } = require('../controllers/user.controller');

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
            // req.user is populated by your Passport Strategy
            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(req.user.id);

            const options = {
                httpOnly: true,
                secure: true, // Always true for Render/Production
                sameSite: 'none' // Essential for Cross-Domain Cookies
            };

            res.cookie("accessToken", accessToken, options);
            res.cookie("refreshToken", refreshToken, options);

            const callbackUrl = `${process.env.CORS_ORIGIN}/auth/callback?token=${accessToken}&role=${req.user.role}`;
            
            res.redirect(callbackUrl);
            
        } catch (error) {
            console.error("LOG: Google Callback Error:", error);
            res.redirect(`${process.env.CORS_ORIGIN}/user/login?error=server_error`);
        }
    }
);

module.exports = router;