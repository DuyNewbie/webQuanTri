var DB = require('./db');

const categorySchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true}
    },
    {
        collation : 'Tb_Category'
    }
)
let categoryModel = DB.mongoose.model('categoryModel', categorySchema);

const productSchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true},
        id_category : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'categoryModel'},
        image : {type : String , require : false},
        name : {type : String , require : true},
        detail : {type : String , require : false},
        price : {type : Number , require : true},
        quantity : {type : Number , require : true}
    },
    {

    }
)
let productModel = DB.mongoose.model('productModel' , productSchema);

module.exports = {categoryModel , productModel}