const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const util = require('../util/util');
const User = require('../models/user');

const DEFAULT_HASH_STRENGTH = 12;
const DEFAULT_TOKEN_EXPIRY = '1h';

exports.signup = async (req, res, next) => {
    // Get user's entered data
    const name = req.body.name.toString();
    const password = req.body.password.toString();

    try {
        // Hash password
        const hashPassword = await bcrypt.hash(password, DEFAULT_HASH_STRENGTH);

        // Create user object
        const user = new User({
            name: name,
            password: hashPassword
        });

        // Store user in DB
        const result = await user.save();

        // Create JWT token
        // return JWT
        const token = createToken(result);

        // Return status and user id
        res.status(200).json({
            message: 'User created',
            token: token,
            userId: result._id
        });
    } catch (err) {
        // Catch errors
        util.error(err, next);
    }

}

exports.login = async (req, res, next) => {
    // Get user's entered data
    const name = req.body.name.toString();
    const password = req.body.password.toString();

    try {
        // Find user
        const user = await User.findOne({
            name: name
        });
        if (!user) util.genericError('User not found', 401);

        // compare passwords
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) util.genericError('Incorrect password', 401);

        // return JWT
        const token = createToken(user);

        // return token to the user
        res.status(200).json({
            token: token,
            userId: user._id
        });

    } catch (err) {
        // Catch errors
        util.error(err, next);
    }
}

const createToken = (user) => {
    return token = jwt.sign({
        name: user.name,
        userId: user._id
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRY || DEFAULT_TOKEN_EXPIRY
    });
}