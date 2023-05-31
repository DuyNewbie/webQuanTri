const { log } = require('console');
var myDB = require('../models/products.model')
var fs = require('fs');

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

    let listProd = await myDB.productModel.find(dieuKienLoc).sort(dieuKienSapXep).populate('id_category')
    let listCate = await myDB.categoryModel.find();

    res.render('products/list', { 
        title: title, msg: msg, 
        listProd: listProd, 
        listCate: listCate, 
        // idTheLoai: req.params.idtl, 
        // name: req.query.name, 
        // typeSort: req.params.price 
    })
}

exports.add = async (req, res, next) => {
    console.log(req.body , req.file);
    let title = 'Thêm Sản Phẩm';
    let msg = '';
    let listTL = await myDB.categoryModel.find()
    if (req.method == "POST") {

        let objSP = new myDB.productModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.detail = req.body.detail;
        objSP.id_category = req.body.category;
        objSP.quantity = req.body.quantity
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/imgProduct/'+req.file.originalname);
                objSP.image = '/imgProduct/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            await objSP.save();
            msg = "Thêm sản phẩm thành công"
            res.redirect('/product')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }

    res.render('products/add', { 
        title: title, msg: msg, 
        listTL: listTL 
    });
}

exports.delete = async (req, res, next) => {
    let msg = '';
    let idSP = req.params.idProU;

    let objSP = new myDB.productModel();
    objSP._id = idSP;

    try {
        await myDB.productModel.findByIdAndDelete(idSP, objSP)
        msg = "Xóa thể loại thành công"
        res.redirect('/product/')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('products/list', { title: tieuDe, msg: msg })
}

exports.detail = async (req, res, next) => {
    let tieuDe = 'Chi tiết sản phẩm';
    let msg = '';
    let idSP = req.params.idProU;
    let data = await myDB.productModel.findById(idSP).populate('id_category');

    res.render('products/detail', { title: tieuDe, data: data, msg: msg })
}

