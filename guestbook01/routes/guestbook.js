const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbook');

router.route("").get(controller.index);
router.route("/delete/:no").get(controller.deleteform);
router.route("/delete").post(controller.delete);
router.route("/add").post(controller.insert);

module.exports = router;