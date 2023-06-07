var mdProd = require('../../models/products.model');

exports.list = async (req , res , next) => {
    let msg = "list Product";
    let listProduct = await mdProd.productModel.find();

    res.status(200).json(
        {
            msg : msg,
            listProduct : listProduct
        }
    )
}