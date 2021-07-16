const express = require('express');
const controller = require('../controllers/guestbook-api');

const router = express.Router();
router.route("/:no").get(controller.read);
router.route("/:no").delete(controller.delete);
router.route("").post(controller.post);

module.exports = router;