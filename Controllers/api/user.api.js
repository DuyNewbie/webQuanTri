var mdUser = require('../../models/users.model');

exports.list = async (req , res , next) => {

    let listUser = await mdUser.userModel.find();

    res.status(200).json(
        {
            msg : "Value User",
            listUser : listUser,
        }
    )
}

exports.loginApp = async (req , res , next) => {

    let checkLogin = false;

    

    res.status(200).json(
        {
            msg : "Value Login",
            checkLogin : checkLogin
        }
    )
}