var express = require('express');
var router = express.Router();
var categoryCtrl = require('../Controllers/category.controller');
var checkLogin = require('../meddlewares/check_login');

router.get('/',checkLogin.checkLogin, categoryCtrl.list);
router.post('/',checkLogin.checkLogin, categoryCtrl.update);

router.get('/add',checkLogin.checkLogin, categoryCtrl.add);
router.post('/add',checkLogin.checkLogin, categoryCtrl.add);

router.get('/delete/:idCate',checkLogin.checkLogin, categoryCtrl.delete);

module.exports = router;