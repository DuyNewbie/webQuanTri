var mdProd = require('../../models/products.model');

exports.list = async (req , res , next) => {
    let msg = "list Product";
    let listProduct = await mdProd.productModel.find();
    let listCategory = await mdProd.categoryModel.find();

    res.status(200).json(
        {
            msg : msg,
            listProduct : listProduct,
            listCategory : listCategory
        }
    )
}

exports.listProdInCate = async (req , res , next) => {
    let msg = "list san pham theo the loai";

    let listProd = await mdProd.productModel.find({id_category : req.query.idCategory});

    res.status(200).json(
        {
            msg : msg,
            listProd : listProd
        }
    )
}