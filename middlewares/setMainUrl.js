const setMainUrl = (req, res, next) => {
    // output -> http://localhost:3000
    req.mainUrl = `${req.protocol}://${req.get('host')}`;
    next();
}

module.exports = setMainUrl