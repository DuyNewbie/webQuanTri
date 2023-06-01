var express = require('express');
var router = express.Router();
var userApi = require('../Controllers/api/user.api');

router.get('/user' , userApi.list);

router.post('/login-app', userApi.loginApp);

module.exports = router;