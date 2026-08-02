const express = require('express');
const passport = require('../config/passport');
const { authenticateToken } = require('../middleware/auth');
const {
  googleCallback,
  sendOTP,
  verifyOTP,
  sendMagicLink,
  verifyMagicLink,
  getCurrentUser,
  logout,
} = require('../controllers/authController');

const router = express.Router();

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login?error=google_auth_failed',
  }),
  googleCallback
);

// Email OTP
router.post('/otp/send', sendOTP);
router.post('/otp/verify', verifyOTP);

// Magic Link
router.post('/magic-link/send', sendMagicLink);
router.get('/magic-link/verify', verifyMagicLink);

// Current user (protected)
router.get('/me', authenticateToken, getCurrentUser);

// Logout
router.post('/logout', authenticateToken, logout);

module.exports = router;
