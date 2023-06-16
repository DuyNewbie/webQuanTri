var mdBill = require('../../models/bills.model');
var mdProd = require('../../models/products.model');

exports.list = async (req , res , next) => {
    let msg = "";

    let listCart = new mdBill.cartModel();
    let listIdProd = [];
    let listProd = new mdProd.productModel();

    try {
        listCart = await mdBill.cartModel.find({id_User : req.query.idUser}).populate('id_product');
        
        listCart.forEach(item => {
            listIdProd.push(item.id_product);
        });
        listProd = await mdProd.productModel.find({_id : {$in : listIdProd} , status : true});
        msg = "Lấy danh sách giỏ hàng thành công";
    } catch (error) {
        console.log(error);
        msg = "Lấy danh sách thất bại";
    }
    
    res.status(200).json(
        {
            msg : msg,
            listCart : listCart
        }
    )
}

exports.addCart = async (req , res , next) => {
    let msg = "";
    let isComplete = false;

    if(req.method == 'POST'){
        let objCart = new mdBill.cartModel();
        let objProd = await mdProd.productModel.findById(req.query.idProduct);

        console.log("so Luong sp : " + objProd.quantity + "   mua sp : " + req.query.Quantity);

        if(objProd.quantity >= req.query.Quantity){
            console.log("so Luong sp : " + objProd.quantity + "   mua sp : " + req.query.Quantity);
            objCart.id_User = req.query.idUser;
            objCart.id_product = req.query.idProduct;
            objCart.quantity = req.query.Quantity;
            objCart.status = true;
    
            try {
                await objCart.save();
                isComplete = true;
                msg = "Thêm thành công";
            } catch (error) {
                console.log(error);
                msg = "Thêm sản phẩm vào giỏ hàng thất bại";
            }
        }else{
            msg = "Số lượng sản phẩm không đủ";
            isComplete = false;
        }
       
    }

    res.status(200).json(
        {
            msg : msg,
            isComplete : isComplete
        }
    )
}

exports.addBill = async (req , res , next) => {
    let msg = "";
    let isComplete = false;
    let isOK = true;

    if(req.method = 'POST'){
        let listIdCart = Array(req.query.Cart);

        console.log(listIdCart);


        console.log("-------------------------");
        

        for(let i = 0 ; i < listIdCart.length ; i++){
            console.log(listIdCart);

            // let objCart = await mdBill.cartModel.findById(listIdCart[i])
            // let objProd = await mdProd.productModel.findById(objCart.id_product);
            
            // if(objProd.quantity < objCart.quantity){
            //     isOK = false;
            //     msg = "Số lượng sản phẩm không đủ";
            //     isComplete = false;
            // }
        }

    //    if(isOK){
    //         listCart.forEach(async item => {
    //             let objProd = await mdProd.productModel.findById(item.id_product);
    //             objProd.quantity -= item.quantity;
    //         });

    //         let date_ob = new Date();
    //         let year = date_ob.getFullYear();
    //         let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    //         let date = ("0" + date_ob.getDate()).slice(-2);

    //         let objBillOne = new mdBill.billModel();

    //         objBillOne.id_user = req.query.idUser;
    //         objBillOne.cart = listCart;
    //         objBillOne.prices = req.query.Prices;
    //         objBillOne.date = year + "-" + month + "-" + date;
    //         objBillOne.status = "Chờ";

    //         try {
    //             await objBillOne.save();
    //             msg = "Mua sản phẩm thành công"
    //             isComplete = true;
    //         } catch (error) {
    //             console.log(error);
    //             msg = "Mua sản phẩm thất bại";
    //         }
    //    }
    }

    res.status(200).json(
        {
            msg : msg,
            isComplete : isComplete
        }
    )
}