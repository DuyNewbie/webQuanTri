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

exports.createAccount = async (req , res , next) => {
    let msg = "";
    let isComplete = false;

    if(req.method == 'POST'){

        let objCheck = await mdUser.userModel.findOne({username : req.query.UserName});

        let objUser = new mdUser.userModel();
        if(objCheck){
            msg = "User đã tồn tại";
        }else{
            objUser.username = req.query.UserName;
            objUser.password = req.query.PassWord;
            objUser.fullname = req.query.FullName;
            objUser.phone = req.query.Phone;
            objUser.email = req.query.Email;
            objUser.address = req.query.Address;
            objUser.role = "User";

            try{
                await objUser.save();
                msg = "Đăng ký thành công";
                isComplete = true;
            }catch(err){
                console.log(err);
                msg = "Đăng ký Thất bại";
            }
        }

        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/avata/'+req.file.originalname);
                objUser.avata = '/avata/' + req.file.originalname;
            }
        } catch (error) {
            console.log("Ảnh bị lỗi rồi: "+error);
        }
        
    }

    res.status(200).json(
        {
            msg : msg,
            isComplete : isComplete
        }
    )
}

exports.changePassword = async (req , res ,next) => {
    let msg = "";
    let isComplete = false;

    if(req.method == 'POST'){
        
    }


    res.status(200).json(
        {
            msg : msg,
            isComplete : isComplete
        }
    )
}