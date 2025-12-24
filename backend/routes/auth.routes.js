const router = require('express').Router();
const passport = require('../config/passport');
const { generateAccessAndRefreshTokens } = require('../controllers/user.controller');
const { getLoginData } = require('../utils/auth.helper');

router.get('/google', (req, res, next) => {
    const { role } = req.query;
    const state = role ? Buffer.from(JSON.stringify({ role })).toString('base64') : undefined;

    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: state,
        session: false
    })(req, res, next);
});

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/',
        session: false
    }),
    async (req, res) => {
        try {
            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(req.user.id);

            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            };

            res.cookie("accessToken", accessToken, options);
            res.cookie("refreshToken", refreshToken, options);
            res.redirect(`${process.env.CORS_ORIGIN}/auth/callback?token=${accessToken}&role=${req.user.role}`);
        } catch (error) {
            console.error("LOG: Google Callback Error:", error);
            res.redirect(`${process.env.CORS_ORIGIN}/?error=auth_failed`);
        }
    }
);

module.exports = router;