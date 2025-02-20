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

    //inserire anche Types per stampare dinamicamente i bottoni delle categorie del modal


    connect.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const properties = results.map(property => {
            return {
                ...property,
                image: req.mainUrl + property.image
            }
        })
        res.json(properties);
    });
}

const show = (req, res) => {
    const id = parseInt(req.params.id)
    const sql = `SELECT properties.*, types.name as type
        FROM properties
        JOIN types ON properties.type_id = types.id
        WHERE properties.id = ?`

    const sqlReviews = `SELECT reviews.*
        FROM reviews
        WHERE reviews.property_id = ?`

    const sqlImages = `SELECT images.*
        FROM images
        WHERE images.property_id = ?`


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