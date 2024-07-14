const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sid:sid2004@cluster0.6dympwg.mongodb.net/swiftcart?retryWrites=true&w=majority")
.then(()=>{
    console.log("MONGO DB CONNCETED SUCCESSFULLY")
})