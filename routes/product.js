var express = require('express');
var router = express.Router();
var productCtrl = require('../Controllers/product.controller');
var multer = require('multer')
var uploadImg = multer({dest: './tmp'})


router.get('/', productCtrl.list);

router.get('/add', productCtrl.add);
router.post('/add',uploadImg.single("image") , productCtrl.add);




module.exports = router;