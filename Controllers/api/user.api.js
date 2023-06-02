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

    let msg = ""
    let checkLogin = false;

    if (req.method == 'POST') {

        try{
            let userName = req.query.UserName;
            let passWord = req.query.PassWord;

            try{
                let objUser = await mdUser.userModel.findOne({username : userName});

                if(objUser){
                    if(objUser.password == passWord){
                        checkLogin = true;
                        msg = "Login thanh cong"
                    }else{
                        msg = "sat Password"
                    }
                }else{
                    msg = "Sai User"
                }
    
            }catch(err){
                console.log(err);
            }

        }catch(err){
            console.log(err);
            console.log("Error : Không nhân được user or pass");
        }


    }

    res.status(200).json(
        {
            msg : msg,
            checkLogin : checkLogin
        }
    )
}