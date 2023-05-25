var express = require('express');
var router = express.Router();
var userCtrl = require('../Controllers/user.controller')

router.get('/', userCtrl.list);

module.exports = router;