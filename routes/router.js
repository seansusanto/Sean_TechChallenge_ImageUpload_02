const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/images", controller.getImages);
router.post("/images", controller.uploadImage);
router.put("/images/:id", controller.updateImage);
router.delete("/images/:id", controller.deleteImage);

module.exports = router;
