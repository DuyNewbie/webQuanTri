var express = require('express');
var router = express.Router();
var productCtrl = require('../Controllers/product.controller');

const multer = require('multer');
var upLoader = multer({dest : './tmp'});


router.get('/', productCtrl.list);
router.post('/' , upLoader.single("uimage-product") , productCtrl.updateP);
router.post('/' , productCtrl.updateP);

router.get('/add', productCtrl.add);
router.post('/add',upLoader.single("image-product") , productCtrl.add);

router.get('/delete/:idProU', productCtrl.delete);
router.get('/detail/:idProU', productCtrl.detail);


module.exports = router;