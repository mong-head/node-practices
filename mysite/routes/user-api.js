const express = require('express');
const controller = require('../controllers/user-api');
const auth = require('./auth');

const router = express.Router()
router.route('/checkemail').get(controller.checkemail);
router.route('/needauth').get(auth,(req,res)=> res.send({result:"success"}));

module.exports = router;