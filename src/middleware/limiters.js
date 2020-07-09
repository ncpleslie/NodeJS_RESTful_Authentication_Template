const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

exports.rate = rateLimit({
    windowMs: process.env.RATELIMIT_SECONDS * 1000 || 30 * 1000,
    max: process.env.RATELIMIT_REQUESTS || 10
});

exports.speed = slowDown({
    windowMs: process.env.SPEEDLIMIT_SECONDS * 1000 || 30 * 1000,
    delayAfter: 1,
    delayMs: process.env.SPEEDLIMIT_DELAY || 100
})