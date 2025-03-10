const express = require("express")
const router = express.Router()

const propertiesController = require("../controllers/propertiesController")
const storeValidator = require('../middlewares/storeValidator')
const storeReviewValidator = require('../middlewares/storeReviewValidator')
const upload = require("../middlewares/multer")
const uploadGallery = require('../middlewares/multerGallery');

router.get("/", propertiesController.index)

router.get("/:id", propertiesController.show)

router.post("/", upload.single('cover_img'), storeValidator, propertiesController.store)
// Store gallery
router.post("/:id/gallery", uploadGallery.array('gallery'), propertiesController.storeGallery)
// Store review
router.post("/:id/review", storeReviewValidator, propertiesController.storeReview)

router.patch("/:id", propertiesController.modifyLikes)

module.exports = router