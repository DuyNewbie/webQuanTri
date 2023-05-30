var express = require('express');
var router = express.Router();
var productCtrl = require('../Controllers/product.controller');

const multer = require('multer');
var upLoader = multer({dest : './tmp'});

router.get('/', productCtrl.list);

router.get('/add', productCtrl.add);
router.post('/add',upLoader.single("image-product") , productCtrl.add);
router.post('/add', productCtrl.add);


module.exports = router;