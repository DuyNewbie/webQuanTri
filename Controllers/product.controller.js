var myDB = require('../models/products.model')
var fs = require('fs')

exports.list = async (req, res, next) => {
    let title = 'Danh Sách Sản Phẩm';
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    // //tìm kiếm
    // if (req.query.name != '' && String(req.query.name) != 'undefined') {
    //     dieuKienLoc = { name: { $regex: req.query.name } }
    // }
    // // chức năng lọc
    // if (req.params.idtl != '0') {
    //     if (typeof (req.params.idtl) != 'undefined') {
    //         dieuKienLoc = { id_theloai: String(req.params.idtl) }
    //         console.log("đã lọc: " + req.params.idtl);
    //     }
    // }
    // // chức năng sắp xếp
    // if (req.params.price != '0') {
    //     if (typeof (req.params.price) != 'undefined') {
    //         dieuKienSapXep = { price: Number(req.params.price) }
    //         console.log("đã sắp xếp: " + req.params.price);
    //     }

    // }
    console.log("chưa sắp xếp: " + req.params.price);

    let listProd = await myDB.productModel.find(dieuKienLoc).sort(dieuKienSapXep).populate('id_category')
    let listCate = await myDB.categoryModel.find()
    res.render('products/list', { 
        title: title, msg: msg, listProd: listProd, 
        listCate: listCate, 
        // idTheLoai: req.params.idtl, 
        // name: req.query.name, 
        // typeSort: req.params.price 
    })
}

