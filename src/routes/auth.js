const express = require('express');

const validation = require('../middleware/validation');
const error = require('../middleware/error');
const authController = require('../controllers/auth');

const router = express.Router();

// PUT on localhost:port/user/signup
router.put('/signup', validation.userSignup, error.validationError, authController.signup);

// POST on localhost:port/user/login
router.post('/login', validation.userLogin, error.validationError, authController.login);

module.exports = router;