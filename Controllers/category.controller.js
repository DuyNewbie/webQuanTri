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

exports.update = async (req, res, next) => {

    if (req.method == "POST") {
        let idCategory = req.body.idCate;

        let objCate = await myDB.categoryModel.findById(idCategory);
        objCate.name = req.body.name;

        try {
            await myDB.categoryModel.findByIdAndUpdate(idCategory, objCate);
            res.redirect('/category')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }
    res.render('categorys/list')
}

exports.delete = async (req, res, next) => {
    let id = req.params.idCate

    try {
        await myDB.categoryModel.findByIdAndDelete(id)
        res.redirect('/category')
    } catch (error) {
        msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
    }
    res.render('categorys/list',)
}