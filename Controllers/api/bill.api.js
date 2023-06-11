const express = require('express');
var mdBill = require('../../models/bills.model');

exports.addCart = async (req , res , next) => {
    let msg = "";
    let isComplete = false;

    if(req.method == 'POST'){
        let objCart = new mdBill.cartModel();

        objCart.id_product = req.query.Product;
        objCart.quantity = req.query.Quantity;

        try {
            await objCart.save();
            msg = "Thêm thành công";
        } catch (error) {
            console.log(error);
            msg = "Thêm sản phẩm vào giỏ hàng thất bại";
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

    if(req.method = 'POST'){
        let date_ob = new Date();
        let year = date_ob.getFullYear();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let date = ("0" + date_ob.getDate()).slice(-2);

        let objBillOne = new mdBill.billModel();

        objBillOne.id_user = req.query.idUser;
        objBillOne.cart = req.query.Cart;
        objBillOne.prices = req.query.Prices;
        objBillOne.date = year + "-" + month + "-" + date;
        objBillOne.status = "Chờ";

        try {
            await objBillOne.save();
            msg = "Mua sản phẩm thành công"
            let isComplete = true;
        } catch (error) {
            console.log(error);
            msg = "Mua sản phẩm thất bại";
        }
    }

    res.status(200).json(
        {
            msg : msg,
            isComplete : isComplete
        }
    )
}