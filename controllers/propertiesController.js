const connect = require("../data/db")

/*
    Selezionare id, title, address, likes, avg(reviews), n. tot. recensioni, la prima immagine
    dalle tabelle properties, reviews, images
*/
const index = (req, res) => {
    const sql = `
        SELECT properties.id, properties.title, properties.address, properties.likes, round(avg(reviews.vote), 1) AS average_vote, COUNT(reviews.id) AS number_of_reviews
        FROM properties
        LEFT JOIN reviews ON reviews.property_id = properties.id
        GROUP BY properties.id
        ORDER BY likes DESC
    `
    //inserire anche Types per stampare dinamicamente i bottoni delle categorie del modal

    const sqlImages = `SELECT images.*
        FROM images`

    connect.query(sql, (err, results) => {
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



        // const properties = results
        // res.json(properties)

        // const properties = results.map(property => {
        //     return {
        //         ...property,
        //         image: req.mainUrl + property.image
        //     }
        // })
        // res.json(properties);
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