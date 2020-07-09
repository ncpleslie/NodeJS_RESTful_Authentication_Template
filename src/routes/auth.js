const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const validation = require('../middleware/validation');
const error = require('../middleware/error');
const authController = require('../controllers/auth');

const router = express.Router();

const limiter = rateLimit({
    windowMs: process.env.RATELIMIT_SECONDS * 1000 || 30 * 1000,
    max: process.env.RATELIMIT_REQUESTS || 10
});

const speedLimiter = slowDown({
    windowMs: process.env.SPEEDLIMIT_SECONDS * 1000 || 30 * 1000,
    delayAfter: 1,
    delayMs: process.env.SPEEDLIMIT_DELAY || 100
})

// PUT on localhost:port/user/signup
router.put('/signup', limiter, speedLimiter, validation.userSignup, error.validationError, authController.signup);

// POST on localhost:port/user/login
router.post('/login', limiter, speedLimiter, validation.userLogin, error.validationError, authController.login);

module.exports = router;