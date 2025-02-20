const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")
const setMainUrl = require('./middlewares/setMainUrl')
const sanitizeData = require('./middlewares/sanitizeData')

const propertiesRouter = require("./routers/propertiesRouter")
const typesRouter = require("./routers/typesRouter")

app.use(express.json())
app.use(express.static("public"))
app.use(setMainUrl)

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(sanitizeData)

app.get("/", (req, res) => {
    res.send("server connesso")
})

app.use("/properties", propertiesRouter)
app.use("/types", typesRouter)

app.use(notFound)
app.use(errorsHandler)

app.listen(port, () => {
    console.log(`in ascolto alla porta: ${port}`);

})
