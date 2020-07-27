const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

router.get('/generate', async (req, res) => {
    const secretKey = speakeasy.generateSecret({ name: 'Leandre Auth' });

    const qrcode = await QRCode.toDataURL(secretKey.otpauth_url);
    return res.send(`<h2>Token ${secretKey.base32}</h2> <br> <img src=${qrcode}>  `);
});

router.post('/validate', (req, res) => {
    const { token, secret } = req.body;

    if (!token || !secret) return res.status(422).json({ message: 'Validation error' });

    const isValidToken = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 0,
    });
    return res.status(isValidToken ? 200 : 400).json({
        status: isValidToken,
        message: isValidToken ? 'Token is valid' : 'Token is invalid',
    });
});

module.exports = router;
