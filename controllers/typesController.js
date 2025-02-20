const connect = require("../data/db")


const index = (req, res) => {
    const sql = `
    SELECT *
    FROM types
    ORDER BY name
    `
    connect.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results)
    })

}

module.exports = { index }