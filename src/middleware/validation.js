const {
    body
} = require('express-validator');

const User = require('../models/user');

// User sign up must contain name and not exist already
// User must contain a name of any length > 0
// User must contain password of length > 8
exports.userSignup = [
    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter a name')
    .custom(async (value) => {
        const userDoc = await User.findOne({
            name: value
        });
        if (userDoc) {
            return Promise.reject('Name already exists');
        }
    }),
    body('password').trim().isLength({
        min: process.env.MIN_PASSWORD_LENGTH
    })
];

exports.userLogin = [
    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter a name'),
    body('password').trim().isLength({
        min: process.env.MIN_PASSWORD_LENGTH
    }).withMessage('Password is too short')
];