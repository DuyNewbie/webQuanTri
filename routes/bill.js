var express = require('express');
var router = express.Router();
var billCtrl = require('../Controllers/bill.controller');
var checkLogin = require('../meddlewares/check_login');

router.get('/' ,checkLogin.checkLogin, billCtrl.list);

module.exports = router;