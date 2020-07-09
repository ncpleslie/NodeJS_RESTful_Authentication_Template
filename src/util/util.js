exports.error = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}

exports.genericError = (description, statusCode) => {
    const error = new Error(description);
    error.statusCode = statusCode;
    throw error;
}