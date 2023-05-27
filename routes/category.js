var express = require('express');
var router = express.Router();
var categoryCtrl = require('../Controllers/category.controller');

router.get('/', categoryCtrl.list);

router.get('/add', categoryCtrl.add);
router.post('/add', categoryCtrl.add);

router.get('/edit/:idCate', categoryCtrl.edit);
router.post('/edit/:idCate', categoryCtrl.edit);

router.get('/delete/:idCate', categoryCtrl.delete);

module.exports = router;