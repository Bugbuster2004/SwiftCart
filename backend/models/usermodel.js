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
   
    

});
// module.exports = User = mongoose.model("User", UserSchema);
const User = mongoose.model("User", UserSchema)
module.exports = User;