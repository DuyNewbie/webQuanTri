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