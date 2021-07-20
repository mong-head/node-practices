const express = require('express');
const mainController = require('../controllers/admin/main');
const userController = require('../controllers/admin/user');
const guestbookController = require('../controllers/admin/guestbook');
const boardController = require('../controllers/admin/board');

const router = express.Router();
router.route("").get(mainController.index);
router.route("/user").get(userController.index);
router.route("/guestbook").get(guestbookController.index);
router.route("/board").get(boardController.index);

module.exports = router;