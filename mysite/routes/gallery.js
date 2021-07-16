const express = require('express');
const controller = require('../controllers/gallery');
const auth = require('./auth');

const router = express.Router();
router.route("").get(controller.index);
router.route("/upload").post(controller.upload);
router.route("/delete/:no").get(auth('ADMIN'),controller.delete);

module.exports = router;