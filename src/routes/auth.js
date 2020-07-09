const express = require('express');

const validation = require('../middleware/validation');
const error = require('../middleware/error');
const limiter = require('../middleware/limiters');

const authController = require('../controllers/auth');

const router = express.Router();

// PUT on localhost:port/user/signup
router.put('/signup', limiter.rate, limiter.speed, validation.userSignup, error.validationError, authController.signup);

// POST on localhost:port/user/login
router.post('/login', limiter.rate, limiter.speed, validation.userLogin, error.validationError, authController.login);

module.exports = router;