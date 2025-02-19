const connect = require("../data/db")


const index = (req, res) => {
    const sql = ""
    res.send("elenco degli immobili")
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