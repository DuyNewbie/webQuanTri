var express = require('express');
var router = express.Router();
const multer = require('multer');
var upLoader = multer({dest : './tmp'});
var userApi = require('../Controllers/api/user.api');
var productApi = require('../Controllers/api/product.api');
var billApi = require('../Controllers/api/bill.api');

//user
router.get('/user' , userApi.list);
router.get('/user-one' , userApi.getOneUser);
router.get('/login-app', userApi.loginApp);
router.get('/create-account', userApi.createAccount)
router.post('/create-account' , upLoader.single("img-avata") , userApi.createAccount);
router.post('/change-password' , userApi.changePassword);
router.post('/change-info' , userApi.changeInfo);

//Prodcut
router.get('/product' , productApi.list);

//Bill
router.get('/list-cart' , billApi.list);
router.post('/add-cart' , billApi.addCart);
router.post('/add-bill' , billApi.addBill);

module.exports = router;