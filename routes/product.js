var express = require('express');
var router = express.Router();
var productCtrl = require('../Controllers/product.controller');
var checkLogin = require('../meddlewares/check_login');

const multer = require('multer');
var upLoader = multer({dest : './tmp'});


router.get('/', checkLogin.checkLogin, productCtrl.list);
router.get('/filter/:idtl',checkLogin.checkLogin , productCtrl.list)
router.get('/sort/:gia', checkLogin.checkLogin, productCtrl.list)
router.get('/search', checkLogin.checkLogin, productCtrl.list)

router.post('/' ,checkLogin.checkLogin , upLoader.single("uimage-product") , productCtrl.updateP);

router.get('/add', checkLogin.checkLogin, productCtrl.add);
router.post('/add', checkLogin.checkLogin,upLoader.single("image-product") , productCtrl.add);

router.get('/delete/:idProU', checkLogin.checkLogin, productCtrl.delete);
router.get('/detail/:idProU', checkLogin.checkLogin, productCtrl.detail);


module.exports = router;