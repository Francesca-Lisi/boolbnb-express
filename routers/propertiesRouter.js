const express = require("express")
const router = express.Router()

//importo controller
const propertiesController = require("../controllers/propertiesController")

//importo middlewares
const storeValidator = require('../middlewares/storeValidator')
const storeReviewValidator = require('../middlewares/storeReviewValidator')
const upload = require("../middlewares/multer")
const uploadGallery = require('../middlewares/multerGallery');

//dichiaro le rotte con le loro funzioni associate
router.get("/", propertiesController.index)

router.get("/:id", propertiesController.show)

router.post("/", upload.single('cover_img'), storeValidator, propertiesController.store)

// Store gallery
router.post("/:id/gallery", uploadGallery.array('gallery'), propertiesController.storeGallery)

// Store review
router.post("/:id/review", storeReviewValidator, propertiesController.storeReview)

router.patch("/:id", propertiesController.modifyLikes)

module.exports = router