var express = require('express');
var router = express.Router();
var userApi = require('../Controllers/api/user.api');
var productApi = require('../Controllers/api/product.api');

//user
router.get('/user' , userApi.list);
router.get('/user-one' , userApi.getOneUser);
router.get('/login-app', userApi.loginApp);
router.post('/create-account' , userApi.createAccount);
router.post('/change-password' , userApi.changePassword);
router.post('/change-info' , userApi.changeInfo);

//Prodcut
router.get('product' , productApi.list);

module.exports = router;