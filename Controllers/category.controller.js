var myDB = require('../models/products.model')

exports.list = async (req, res, next) => {
    let title = 'Danh Sách Thể Loại';
    let msg = '';
    let dieuKiemLoc = null;
    let list = await myDB.categoryModel.find(dieuKiemLoc);

    res.render('categorys/list', { title: title, listCate : list, msg: msg })
}

exports.add = async (req, res, next) => {
    let title = 'Thêm Thể Loại';
    let msg = '';

    if (req.method == "POST") {
        let objCate = new myDB.categoryModel();
        objCate.name = req.body.name;

        try {
            let new_TL = await objCate.save();
            msg = "Thêm thể loại thành công"
            res.redirect('/category')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }

    res.render('categorys/add', { title: title, msg: msg, })
}

exports.edit = async (req, res, next) => {
    // let idTL = req.params.idCate;
    // console.log("id"+idTL);
    
    // if (req.method == "POST") {

    //     let objTL = new myDB.categoryModel();
    //     objTL.name = req.body.name;
    //     objTL._id = idTL;

    //     try {
    //         await myDB.categoryModel.findByIdAndUpdate(idTL, objTL)
    //         res.redirect('/category')
    //     } catch (error) {
    //         msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    //     }
    // }
    res.render('categorys/list')
}

exports.delete = async (req, res, next) => {
    let id = req.params.idCate
    let objTL = new myDB.categoryModel();
    objTL._id = id

    try {
        await myDB.categoryModel.findByIdAndDelete(id)
        res.redirect('/category')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('categorys/list',)
}