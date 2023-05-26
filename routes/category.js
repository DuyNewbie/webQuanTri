var express = require('express');
var router = express.Router();
var categoryCtrl = require('../Controllers/category.controller');

router.get('/', categoryCtrl.list);

router.get('/add', categoryCtrl.add);
router.post('/add', categoryCtrl.add);


module.exports = router;