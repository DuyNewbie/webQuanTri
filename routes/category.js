var express = require('express');
var router = express.Router();
var categoryCtrl = require('../Controllers/category.controller');

router.get('/', categoryCtrl.list);

module.exports = router;