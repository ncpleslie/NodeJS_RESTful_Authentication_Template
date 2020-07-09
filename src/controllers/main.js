const data = [];

/*
    All requests will return a basic JSON object
    containing an array declared above ("data").
*/
exports.get = (req, res, next) => {
    res.status(200).json({
        data: data
    });
}