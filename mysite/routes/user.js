const express = require('express');
const controller = require('../controllers/user');
const auth = require('./auth');

const router = express.Router()
router.route('/joinsuccess').get(controller.joinsuccess);
router.route('/join').get(controller.join);
router.route('/join').post(controller._join);

router.route('/login').get(controller.login);
router.route('/login').post(controller._login);
router.route('/logout').get(controller.logout);

router.route('/update').get(auth(), controller.update);
router.route('/update').post(auth(), controller._update);

module.exports = router;