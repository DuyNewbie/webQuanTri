var express = require('express');
var router = express.Router();
var billCtrl = require('../Controllers/bill.controller');

router.get('/' , billCtrl.list);

module.exports = router;