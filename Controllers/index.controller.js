var myDBProduct = require('../models/products.model');
var myDBUser = require('../models/users.model');
var myDBBill = require('../models/bills.model');

exports.index = async (req , res , next) =>{
    var title = "Trang chủ";

    let soLuongCate = await myDBProduct.categoryModel.find().count()
    let soLuongProd = await myDBProduct.productModel.find().count()
    let soLuongUser = await myDBUser.userModel.find({role: "User"}).count()
    let soLuongAdmin = await myDBUser.userModel.find({role: "Staff"}).count()

    res.render('index', {   
        title: title,
        category: soLuongCate,
        product: soLuongProd,
        user: soLuongUser,
        admin: soLuongAdmin,
        sUser : req.session.userLogin.fullname
    })
}

exports.login = async (req , res , next) => {
    let msg = "";
    let typeErr = false;

    if(req.method == 'POST'){
        let Username = req.body.Username;
        let Password = req.body.Password;
        
        let objUser = await myDBUser.userModel.findOne({username : Username});

        if(objUser){
           
            if(objUser.password == Password){
                if(objUser.role != "User"){
                    if(objUser.status){
                        console.log("User " + objUser.username);
                        req.session.userLogin = objUser;
                        res.redirect('/');
                    }else{
                        msg = "Tài khoản của bạn đã bị khóa";
                        typeErr = true;
                    }
                }else{
                    msg = "Tài khoản khách không thể đăng nhập vào wed";
                    typeErr = true;
                }
            }else{
                msg = "Mật khẩu không chính xác";
                typeErr =  true;
            }

        }else{
            msg = "Tài khoản không tồn tại";
            typeErr =  true;
        }
    }

    res.render('account/login',
        {
            msg : msg,
            typeErr : typeErr
        }
    )
}

exports.chanePassword = async (req , res ,next) => {
    let title = "Thay đổi mật khẩu";
    let msg = "";
    let typeErr = false;

    if(req.method == 'POST'){

        let idUser = req.session.userLogin._id;

        let objUser = await myDBUser.userModel.findById(idUser);

        if(objUser.password == req.body.matKhauCu){
            if(req.body.matKhauMoi == req.body.NhapLaiMatKhau){
                objUser.password = req.body.matKhauMoi;
                try {
                    await myDBUser.userModel.findByIdAndUpdate(idUser , objUser);
                    msg = "Thay đổi mật khẩu thành công";
                    typeErr = false;
                } catch (error) {
                    msg = "Lưu mật khẩu thất bại"
                    typeErr = true;
                }
            }else {
                msg = "Xác nhân mật khẩu khôn chính xác";
                typeErr = true
            }
        }else {
            msg = "Mật khẩu cũ không đúng";
            typeErr = true;
        }
    }

    res.render('account/chane_password', {   
        title: title,
        msg : msg,
        typeErr : typeErr,
        sUser : req.session.userLogin.fullname
    })
}

exports.logout = (req , res , next) => {
    req.session.destroy();
    res.redirect('/login');
}