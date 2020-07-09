const jwt = require('jsonwebtoken');

const util = require('../util/util');

module.exports = (req, res, next) => {
    // Ensure request has correct header
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        util.genericError('Not authenticated', 401);
    }

    // Get token
    const token = authHeader.split(' ')[1];

    // Ensure token is legit
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        util.genericError('Not authenticated', 401);
    }

    // If token is legit, allow user to continue
    req.userId = decodedToken.userId;
    next();
}