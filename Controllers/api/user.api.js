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

    let userName = req.query.UserName;
    let passWord = req.quiry.PassWord;

    let checkLogin = false;

    try{
        let objUser = await mdUser.userModel.find({username : userName});

        if(objUser.passWord == passWord){
            checkLogin = true;
        }

    }catch(err){
        console.log(err);
    }

    res.status(200).json(
        {
            msg : "Value Login",
            checkLogin : checkLogin
        }
    )
}