const validator = require('validator');

const storeReviewValidator = (req, res, next) => {
    const { author, text, vote, date, days } = req.body;
    const message = `Il campo inserito non è valido`;
    if (!author || author.length < 3) {
        return res.status(400).json({ error: `author: ${message}` });
    }
    if (!text || text.length < 10) {
        return res.status(400).json({ error: `text: ${message}` });
    }
    if (!vote || vote < 1 || vote > 5 || !validator.isNumeric(String(vote))) {
        return res.status(400).json({ error: `vote: ${message}` });
    }
    if (!date || !validator.isDate(date)) {
        return res.status(400).json({ error: `date: ${message}` });
    }
    if (!days || !validator.isNumeric(String(days))) {
        return res.status(400).json({ error: `days: ${message}` });
    }
    next();
}

module.exports = storeReviewValidator