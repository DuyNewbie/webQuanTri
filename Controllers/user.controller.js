var myDB = require('../models/users.model');
var fs = require('fs');

exports.list = async (req, res, next) => {
    let title = 'Danh Sách Tài khoản';
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    let count = await myDB.userModel.countDocuments();
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
    // let listUser = await myDB.userModel.find({role: "staff"})
    let listUser = await myDB.userModel.find(dieuKienLoc).skip(req.query.Index).limit(10).sort(dieuKienSapXep)

    res.render('users/list', { 
        title: title, msg: msg, 
        listUser: listUser,
        count : count
        // idTheLoai: req.params.idtl, 
        // name: req.query.name, 
        // typeSort: req.params.price 
    })
}

exports.add = async (req, res, next) => {
    console.log(req.body , req.file);
    let title = 'Thêm Sản Phẩm';
    let msg = '';
    if (req.method == "POST") {

        let objUser = new myDB.userModel();
        objUser.username = req.body.taikhoan;
        objUser.password = req.body.matkhau;
        objUser.fullname = req.body.hoten;
        objUser.phone = req.body.sdt;
        objUser.status = true;
        objUser.role = "user"
        try {
            if(req.file){
                fs.renameSync(req.file.path, './public/avata/'+req.file.originalname);
                objUser.avata = '/avata/' + req.file.originalname;
            }
        } catch (error) {
            console.log("Ảnh bị lỗi rồi: "+error);
        }

        try {
            await objUser.save();
            msg = "Thêm sản phẩm thành công"
            res.redirect('/user')
        } catch (error) {
            msg = "Lỗi ghi cơ sở dữ liệu" + error.message;
        }
    }

    res.render('users/add', { 
        title: title, msg: msg, 
    });
}

exports.update = async (req , res , next) =>{
    let msg = '';

    if (req.method == 'POST') {
        let idUser = req.body.idUser;
        let objUser = await myDB.userModel.findById(idUser);

        try {
            if (req.file) {
                fs.renameSync(req.file.path, './public/avata/' + req.file.originalname);
                objUser.avata = '/avata/' + req.file.originalname;
            }
        } catch (error) {
            
        }

        objUser.fullname = req.body.fullname;
        objUser.phone = req.body.phone;
        objUser.email = req.body.email
        objUser.address = req.body.address;

        try {
            await myDB.userModel.findByIdAndUpdate(idUser , objUser);
            msg = "Sửa Tài khoản thành công"
            res.redirect('/user');
        } catch (error) {
            console.log(error)
            msg = "Sửa tài khoản không thành công"
        }
    }

    res.render('users/list' , 
    {
        msg : msg
    });
}


exports.lock = async (req , res , next) => {
    let msg = "";
    let idUser = req.params.id;

    let objUser = await myDB.userModel.findById(idUser);
    objUser.status = false;
    try {
        await myDB.userModel.findByIdAndUpdate(idUser , objUser);
        msg = "Sửa Tài khoản thành công"
        res.redirect('/user');
    } catch (error) {
        console.log(error)
        msg = "Sửa tài khoản không thành công"
    }

    res.render('users/list',
        {
            msg : msg
        }
    )
}

exports.unLock = async (req , res , next) => {
    let msg = "";
    let idUser = req.params.id;

    let objUser = await myDB.userModel.findById(idUser);
    objUser.status = true;

    try {
        await myDB.userModel.findByIdAndUpdate(idUser , objUser);
        msg = "Sửa Tài khoản thành công"
        res.redirect('/user');
    } catch (error) {
        console.log(error)
        msg = "Sửa tài khoản không thành công"
    }

    res.render('users/list',
        {
            msg : msg
        }
    )
}