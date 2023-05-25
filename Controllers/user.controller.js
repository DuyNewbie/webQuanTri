var userModel = require('../models/users.model');

exports.list = async (req , res , next) => {

    res.render('users/list')
}