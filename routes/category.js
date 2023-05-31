var express = require('express');
var router = express.Router();
var categoryCtrl = require('../Controllers/category.controller');

router.get('/', categoryCtrl.list);
router.post('/', categoryCtrl.update);

router.get('/add', categoryCtrl.add);
router.post('/add', categoryCtrl.add);

router.get('/delete/:idCate', categoryCtrl.delete);

module.exports = router;