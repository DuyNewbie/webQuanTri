var express = require('express');
var router = express.Router();
var indexCtrl = require('../Controllers/index.controller');

router.get('/',indexCtrl.index);

module.exports = router;