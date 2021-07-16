const express = require('express');
const controller = require('../controllers/gallery');

const router = express.Router();
router.route("").get(controller.index);
router.route("/:no").delete(controller.delete);
router.route("/update").post(controller.post);

module.exports = router;