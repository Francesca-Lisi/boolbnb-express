const connect = require("../data/db")

const index = (req, res) => {
    const { rooms, beds, type, search } = req.query;
    let params = [];

    let sql = `
    SELECT properties.*, types.name AS category, types.icon_path, ROUND(avg(ratings.value),1) AS average_vote, COUNT(reviews.id) AS num_of_reviews
    FROM properties
    LEFT JOIN reviews ON reviews.property_id = properties.id
    LEFT JOIN ratings ON reviews.rating_id = ratings.id 
    JOIN types ON properties.type_id = types.id
    WHERE 1=1
    `
    if (rooms) {
        sql += ' AND properties.rooms >= ?';
        params.push(rooms);
    }
    if (beds) {
        sql += ' AND properties.beds >= ?';
        params.push(beds);
    }
    if (type) {
        sql += ' AND properties.type_id = ?';
        params.push(type);
    }
    if (search) {
        sql += ` AND (properties.title LIKE '%${search}%' OR properties.address LIKE '%${search}%')`;
    }

    console.log(search)

    sql += `
    GROUP BY properties.id
    ORDER BY likes DESC
    LIMIT ? OFFSET ?
    `

    // Limit e offset devono essere popolati, altrimenti avremo NaN e verra' scatenato un errore

    const sqlImages = `SELECT images.*
        FROM images`

    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const offset = (page - 1) * limit

    connect.query(sql, [...params, limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });


        connect.query(sqlImages, (err, resultImages) => {
            if (err) return res.status(500).json({ error: err.message });

            const resImg = resultImages.map(image => {
                return {
                    ...image,
                    path: req.mainUrl + image.path
                }
            })
            const properties = results.map(property => {
                return {
                    ...property,
                    images: resImg.filter(image => image.property_id === property.id)
                }
            })

            res.json(properties)

        })

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

    connect.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Result not Found' })


        connect.query(sqlReviews, [id], (err, resultReviews) => {
            if (err) return res.status(500).json({ error: err.message });


            connect.query(sqlImages, [id], (err, resultImages) => {
                if (err) return res.status(500).json({ error: err.message });


                const property = result[0]
                res.json({
                    ...property,
                    reviews: resultReviews,
                    images: resultImages.map(image => {
                        return {
                            ...image,
                            path: req.mainUrl + image.path
                        }
                    })
                })
            })
        })


    })





}


const store = (req, res) => {
    const { type_id, title, rooms, beds, bathrooms, sqm, address, email } = req.body

    const sql = `
    INSERT INTO properties (type_id, title, rooms, beds, bathrooms, sqm, address, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    connect.query(sql, [type_id, title, rooms, beds, bathrooms, sqm, address, email], (err, result) => {
        if (err) return res.status(500).json({ err: "Inserimento non riuscito" })
        res.status(201).json({ stato: "success", message: "Inserimento completato" })
    })

    res.json(req.body)
}

const storeReview = (req, res) => {
    const id = parseInt(req.params.id)
    const { author, text, vote, date, days } = req.body;
    const sql = `INSERT INTO reviews (property_id, author, text, vote, date, days) 
    VALUES (?, ?, ?, ?, ?, ?)`

    connect.query(sql, [id, author, text, vote, date, days], (err, result) => {
        if (err) return res.status(500).json({ err: "Inserimento non riuscito" })
        res.status(201).json({ stato: "success", message: "Inserimento completato" })
    })

}

const modifyLikes = (req, res) => {
    const id = parseInt(req.params.id)
    const sql = `UPDATE properties 
        SET likes = likes+1
        WHERE properties.id = ?`

    connect.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ err: "Modifica non riuscita" })
        res.status(200).json({ stato: "success", message: "Elemento aggiornato con successo" })
    })


}

module.exports = {
    index,
    show,
    store,
    storeReview,
    modifyLikes
}