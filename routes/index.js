var express = require('express');
var router = express.Router();
var indexCtrl = require('../Controllers/index.controller');
var checkLogin = require('../meddlewares/check_login');

router.use((req ,res ,next) =>{
    console.log("--dung nay laf meddle");
    next();
  })

router.get('/', checkLogin.checkLogin , indexCtrl.index);

router.get('/login' , indexCtrl.login);
router.post('/login' , indexCtrl.login);
router.get('/logout' , indexCtrl.logout);
router.get('/chane-password' , indexCtrl.chanePassword);
router.post('/chane-password' , indexCtrl.chanePassword)

module.exports = router;