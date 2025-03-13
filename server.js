//Importare e inizializzare express
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors") //cors policy

// importazione middlewares
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler")
const setMainUrl = require('./middlewares/setMainUrl')
const sanitizeData = require('./middlewares/sanitizeData')

//importare routers
const propertiesRouter = require("./routers/propertiesRouter")
const typesRouter = require("./routers/typesRouter")

//body-parser
app.use(express.json())
//asset statici
app.use(express.static("public"))
app.use(setMainUrl)

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

// app.use(sanitizeData)

app.get("/", (req, res) => {
    res.send("server connesso")
})

app.use("/properties", propertiesRouter)
app.use("/types", typesRouter)

app.use(notFound)
app.use(errorsHandler)

//metto in ascolto
app.listen(port, () => {
    console.log(`in ascolto alla porta: ${port}`);

})
