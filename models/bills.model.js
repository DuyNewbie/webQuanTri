var DB = require('./db');

const billSchema = new DB.mongoose.Schema(
    {
        id_user : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'userModel'},
        cart : {type : Array, require: true},
        prices : {type : Number , require : false},
        date : {type : String , require : true},
        status : {type : String , require : false}
    },
    {
        collection : 'Tb_HoaDon'
    }
)
let billModel = DB.mongoose.model('billModel' , billSchema);

const cartSchema = new DB.mongoose.Schema(
    {
        id_User : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'userModel'},
        id_product : {type : DB.mongoose.Schema.Types.ObjectId , ref : 'productModel'},
        quantity : {type : Number , require : true},
        status : {type : Boolean , require : true}
    },
    {
        collection : 'Tb_HoaDon_Product'
    }
)
let cartModel = DB.mongoose.model('cartModel' , cartSchema)

module.exports = {billModel,cartModel}