var express = require('express');
var router = express.Router();
var userCtrl = require('../Controllers/user.controller')

const multer = require('multer');
var upLoader = multer({dest : './tmp'});


router.get('/', userCtrl.list);
router.post('/',upLoader.single("img-avata")  , userCtrl.update);

router.get('/add', userCtrl.add);
router.post('/add',upLoader.single("avata-user")  , userCtrl.add);


module.exports = router;