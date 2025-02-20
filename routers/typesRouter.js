const express = require("express")
const router = express.Router()

const typesController = require("../controllers/typesController")

router.get("/", typesController.index)

module.exports = router