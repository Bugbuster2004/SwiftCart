const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String //cloudinary url
        },
    roleType:{
        type:String,
        default:"user"
    },
    address:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"address"
    }],
    paymentInfo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_info"
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
   
    

});
// module.exports = User = mongoose.model("User", UserSchema);
const User = mongoose.model("User", UserSchema)
module.exports = User;