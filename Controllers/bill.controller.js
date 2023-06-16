var mdBill = require('../models/bills.model');

exports.list = async (req , res , next) =>{
    let title = 'Danh Sách hóa đơn';
    let listBill = await mdBill.billModel.find().populate('id_user');

    res.render('bills/list' , 
    {
        title: title,
        listBill : listBill,
        sUser : req.session.userLogin.fullname
    });
}