const express = require('express');
const router = express.Router();
const controller = require('../controllers/emaillist');

router.route("").get(controller.index);
router.route("/add").get(controller.form);
router.route("/add").post(controller.add);

module.exports = router;