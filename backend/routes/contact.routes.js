// routes/contact.route.js or similar
const express = require('express');
const router = express.Router();
const sendAdminEmail = require("../utils/mail.helper");

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const subject = `New Inquiry from ${name} - Nomad Yatri`;
        const htmlBody = `
            <div style="font-family: sans-serif; color: #1a1a1a;">
                <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Website Message</h2>
                <p><strong>Traveler Name:</strong> ${name}</p>
                <p><strong>Traveler Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #F9F8F6; padding: 20px; border-radius: 10px; border-left: 4px solid #facc15;">
                    ${message}
                </div>
            </div>
        `;

        // Using your existing helper
        await sendAdminEmail(subject, htmlBody);

        res.status(200).json({ success: true, message: "Email dispatched" });
    } catch (error) {
        console.error("Mail Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;