var express = require('express');
var router = express.Router();
var userCtrl = require('../Controllers/user.controller');
var checkLogin = require('../meddlewares/check_login');

const multer = require('multer');
var upLoader = multer({dest : './tmp'});


router.get('/' , checkLogin.checkLogin, userCtrl.list);
router.post('/' , checkLogin.checkLogin,upLoader.single("img-avata")  , userCtrl.update);

router.get('/add', checkLogin.checkLogin, userCtrl.add);
router.post('/add', checkLogin.checkLogin,upLoader.single("avata-user")  , userCtrl.add);

router.get('/lock/:id', checkLogin.checkLogin, userCtrl.lock);
router.get('/un-lock/:id',checkLogin.checkLogin , userCtrl.unLock);


module.exports = router;