const express = require('express');
const controller = require('../controllers/guestbook');

const router = express.Router()
router.route("").get(controller.list);
router.route("/add").post(controller.insert);
router.route("/delete/:no").get(controller.delete);
router.route("/delete").post(controller._delete);

module.exports = router;