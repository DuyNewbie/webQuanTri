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
    let title = 'Thêm Sản Phẩm';
    let msg = '';
    let listTL = await myDB.categoryModel.find()
    if (req.method == "POST") {
        try {
            let objSP = new myDB.productModel();
            objSP.name = req.body.name;
            objSP.price = req.body.price;
            objSP.detail = req.body.detail;

            fs.renameSync(req.file.path, './public/imgProduct/' + req.file.originalname);
            objSP.image = '/imgProduct/' + req.file.originalname

            objSP.id_category = req.body.category;
            objSP.quantity = req.body.quantity

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


exports.updateP = async (req,res,next) => {
    let msg = '';
    
    if (req.method == 'POST') {
        let idProduct = req.body.idProduct;
        let objProdut = await myDB.productModel.findById(idProduct);

        fs.renameSync(req.file.path, './public/imgProduct/' + req.file.originalname);
        objProdut.image = '/imgProduct/' + req.file.originalname;
        
        objProdut.name = req.body.name;
        objProdut.id_category = req.body.category;
        objProdut.price = req.body.price;
        objProdut.quantity = req.body.quantity;
        objProdut.detail = req.body.detail;
       
        try{
            await myDB.productModel.findByIdAndUpdate(idProduct, objProdut);
            msg = "Sửa thể tài khoản thành công"
            res.redirect('/product');
        }catch(error){
            console.log(error)
            msg = "Sửa thể tài khoản không thành công"
            res.redirect('/product');
        }
    }

    res.render('products/list', {msg});
}