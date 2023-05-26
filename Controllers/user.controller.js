var userModel = require('../models/users.model');

exports.list = async (req , res , next) => {
    let title = 'Danh Sách Tài khoản';

    res.render('users/list' , {title: title})
}