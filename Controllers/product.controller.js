const { log } = require('console');
var myDB = require('../models/products.model')
var DbCmt = require('../models/users.model')
var fs = require('fs');
const { KeyObject } = require('crypto');

exports.list = async (req, res, next) => {
    let title = 'Danh Sách Sản Phẩm';
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    //tìm kiếm
    if (req.query.name != '' && String(req.query.name) != 'undefined') {
        dieuKienLoc = { name: { $regex: req.query.name } }
    }
    // chức năng lọc
    if (req.params.idtl != '0') {
        if (typeof (req.params.idtl) != 'undefined') {
            dieuKienLoc = { id_theloai: String(req.params.idtl) }
            console.log("đã lọc: " + req.params.idtl);
        }
    }
    // chức năng sắp xếp
    if (req.params.gia != '0') {
        if (typeof (req.params.gia) != 'undefined') {
            dieuKienSapXep = { price: Number(req.params.gia) }
            console.log("đã sắp xếp: " + req.params.gia);
        }

    }

    let listProd = await myDB.productModel.find(dieuKienLoc).sort(dieuKienSapXep).populate('id_category')
    let listCate = await myDB.categoryModel.find();

    res.render('products/list', { 
        title: title, msg: msg, 
        listProd: listProd, 
        listCate: listCate, 
        idTheLoai: req.params.idtl, 
        name: req.query.name, 
        typeSort: req.params.gia 
    })
}

exports.add = async (req, res, next) => {
    let title = 'Thêm Sản Phẩm';
    let msg = '';
    let listTL = await myDB.categoryModel.find()
    if (req.method == "POST") {

        let objProduct = new myDB.productModel();
        objProduct.name = req.body.name;
        objProduct.price = req.body.price;
        objProduct.detail = req.body.detail;
        objProduct.id_category = req.body.category;
        objProduct.quantity = req.body.quantity
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/imgProduct/'+req.file.originalname);
                objProduct.image = '/imgProduct/' + req.file.originalname;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            await objProduct.save();
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
    let idProduct = req.params.idProU;

    let objProduct = new myDB.productModel();
    objProduct._id = idProduct;

    try {
        await myDB.productModel.findByIdAndDelete(idProduct, objProduct)
        msg = "Xóa thể loại thành công"
        res.redirect('/product')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('products/list', { msg: msg })
}

exports.updateP = async (req,res,next) => {
    let msg = '';
    console.log("update dang chay")
    if (req.method == 'POST') {
        let idProduct = req.body.idProduct;
        let objProdut = await myDB.productModel.findById(idProduct);

        if(!String(req.file) == 'undefined'){
            fs.renameSync(req.file.path, './public/imgProduct/' + req.file.originalname);
            objProdut.image = '/imgProduct/' + req.file.originalname;
        }
        
        objProdut.name = req.body.name;
        objProdut.id_category = req.body.category;
        objProdut.price = req.body.price;
        objProdut.quantity = req.body.quantity;
        objProdut.detail = req.body.detail;
       
        try{
            await myDB.productModel.findByIdAndUpdate(idProduct, objProdut);
            msg = "Sửa sản phẩm thành công"
            res.redirect('/product');
        }catch(error){
            console.log(error)
            msg = "Sửa sản phẩm không thành công"
            res.redirect('/product');
        }
    }

    res.render('products/list', {msg});
}

exports.detail = async (req, res, next) => {
    let tieuDe = 'Chi tiết sản phẩm';
    let msg = '';
    let idSP = req.params.idProU;
    let data = await myDB.productModel.findById(idSP).populate('id_category');
    console.log("id "+idSP);
    let listCmt = await myDB.commentModel.find({id_product : String(req.params.idProU)}).populate('id_user')
    // let listCmt = await myDB.commentModel.find({cmt_content:"ngon ghê"}).populate('id_user')
    console.log("đây là list cmt "+ listCmt.length);

    res.render('products/detail', { title: tieuDe, data: data, msg: msg, listCmt: listCmt })
}
