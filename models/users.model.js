var DB = require('./db');

const userSchema = new DB.mongoose.Schema(
    {
        avata : {type : String , require : false},
        username : {type : String , require : true},
        password : {type : String , require : true},
        fullname : {type : String , require : false},
        email : {type : String , require : false},
        phone : {type : String , require : false},
        address : {type : String , require : false},
        role : {type : String , require : false},
    },
    {
        collection : 'Tb_User'
    }
)

let userModel = DB.mongoose.model('userModel' , userSchema);



module.exports = {userModel}