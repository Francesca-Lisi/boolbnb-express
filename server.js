const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")

app.use(express.json())
app.use(express.static("public"))

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.get("/", (req, res) => {
    res.send("server connesso")
})

//inserire collegamento con il router

app.use(notFound)
app.use(errorsHandler)

app.listen(port, () => {
    console.log(`in ascolto alla porta: ${port}`);

})
