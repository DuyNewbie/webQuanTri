var express = require('express');
var router = express.Router();
var productCtrl = require('../Controllers/product.controller');

router.get('/', productCtrl.list);

module.exports = router;