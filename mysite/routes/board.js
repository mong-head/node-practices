const express = require('express');
const controller = require('../controllers/board')

const router = express.Router();
router.route("/view/:no").get(controller.view);
router.route("/write").get(controller.write);
router.route("/write(/:no)?").post(controller._write);
router.route("/update/:no").get(controller.update);
router.route("/update/:no").post(controller._update);
router.route("/delete/:no").get(controller.delete);
router.route("").get(controller.index);
router.route("/:no").get(controller.index);

module.exports = router;