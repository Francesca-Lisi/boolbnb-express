const express = require("express")
const router = express.Router()

const propertiesController = require("../controllers/propertiesController")
const storeValidator = require('../middlewares/storeValidator')
const storeReviewValidator = require('../middlewares/storeReviewValidator')
const upload = require("../middlewares/multer")

router.get("/", propertiesController.index)

router.get("/:id", propertiesController.show)

router.post("/", upload.single('cover_img'), storeValidator, propertiesController.store)

router.post("/:id/review", storeReviewValidator, propertiesController.storeReview)

router.patch("/:id", propertiesController.modifyLikes)

module.exports = router