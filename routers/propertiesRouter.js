const express = require("express")
const router = express.Router()

const propertiesController = require("../controllers/propertiesController")

router.get("/", propertiesController.index)

router.get("/:id", propertiesController.show)

router.post("/", propertiesController.store)

router.post("/:id/review", propertiesController.storeReview)

router.patch("/:id", propertiesController.modifyLikes)

module.exports = router