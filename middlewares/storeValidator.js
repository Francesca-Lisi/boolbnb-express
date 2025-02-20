const validator = require('validator');

const storeValidator = (req, res, next) => {
    const { title, rooms, beds, bathrooms, sqm, address, email } = req.body

    let message = `Il campo inserito non è valido `

    if (!title || title.length <= 10) {
        return res.status(400).json({ error: `title: ${message}` })
    }

    if (!rooms || rooms < 1 || !validator.isNumeric(String(rooms))) {
        return res.status(400).json({ error: `rooms: ${message}` })
    }

    if (!beds || beds < 1 || !validator.isNumeric(String(beds))) {
        return res.status(400).json({ error: `beds: ${message}` })
    }
    if (!bathrooms || bathrooms < 1 || !validator.isNumeric(String(bathrooms))) {
        return res.status(400).json({ error: `bathrooms: ${message}` })
    }
    if (!sqm || sqm < 10 || !validator.isNumeric(String(sqm))) {
        return res.status(400).json({ error: `sqm: ${message}` })
    }
    if (!address || address.length <= 5) {
        return res.status(400).json({ error: `address: ${message}` })
    }
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: `email: ${message}` })
    }

    next();
}

module.exports = storeValidator