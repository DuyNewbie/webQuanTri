
exports.list = (req , res , next) =>{
    let title = 'Danh Sách hóa đơn';

    res.render('bills/list' , {title: title});
}