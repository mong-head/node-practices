const express = require('express');
const controller = require('../controllers/board');
const auth = require('./auth');

const router = express.Router();
router.route("/view/:no").get(controller.view);
router.route("/write").get(auth(),controller.write);
router.route("/write(/:no)?").post(auth(),controller._write);
router.route("/update/:no").get(auth(),controller.update);
router.route("/update/:no").post(auth(),controller._update);
router.route("/delete/:no").get(auth(),controller.delete);
router.route("(/:no)?").get(controller.index);
router.route("(/:no)?").post(controller.index);

module.exports = router;