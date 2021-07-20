const express = require('express');
const controller = require('../controllers/board')

const router = express.Router();
router.route("").get(controller.index);
router.route("/:no").get(controller.index);

router.route("/view/:no").get(controller.view);


module.exports = router;