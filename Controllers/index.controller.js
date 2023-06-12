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
        admin: soLuongAdmin 
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