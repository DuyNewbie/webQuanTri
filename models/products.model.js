var DB = require('./db');

const categorySchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true}
    },
    {
        collection : 'Tb_Category'
    }
)
let categoryModel = DB.mongoose.model('categoryModel', categorySchema);

const productSchema = new DB.mongoose.Schema(
    {
        name : {type : String , require : true},
        id_category : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'categoryModel'},
        image : {type : String , require : false},
        detail : {type : String , require : false},
        price : {type : Number , require : true},
        quantity : {type : Number , require : true}
    },
    {
        collection : 'Tb_Product'
    }
)
let productModel = DB.mongoose.model('productModel' , productSchema);

const commentSchema = new DB.mongoose.Schema(
    {
        id_user : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'userModel'},
        id_product : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'productModel'},
        cmt_content : {type : String , require : false},
    },
    {
        collection : 'Tb_Comment'
    }
)
let commentModel = DB.mongoose.model('commentModel' , commentSchema);

module.exports = {categoryModel , productModel, commentModel}