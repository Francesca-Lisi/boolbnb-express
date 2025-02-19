const connect = require("../data/db")

/*
    Selezionare id, title, address, likes, avg(reviews), n. tot. recensioni, la prima immagine
    dalle tabelle properties, reviews, images
*/
const index = (req, res) => {
    const sql = `
        SELECT properties.id, properties.title, properties.address, properties.likes, round(avg(reviews.vote), 1) AS average_vote, COUNT(reviews.id) AS number_of_reviews , images.path AS image
        FROM properties
        LEFT JOIN reviews ON reviews.property_id = properties.id
        LEFT JOIN images ON images.property_id = properties.id
        GROUP BY properties.id, image
        ORDER BY likes DESC
    `
    connect.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(req.mainUrl);
        res.json(results);
    });
}

const show = (req, res) => {
    const id = req.params.id
    res.send(`immobile con id ${id}`)
}

const store = (req, res) => {
    res.send("immobile caricato")
}

const storeReview = (req, res) => {
    const id = req.params.id
    res.send(`recensione con id ${id} caricata`)
}

module.exports = {
    index,
    show,
    store,
    storeReview
}