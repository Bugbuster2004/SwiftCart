// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://sid:sid2004@cluster0.6dympwg.mongodb.net/swiftcart?retryWrites=true&w=majority")
// .then(()=>{
//     console.log("MONGO DB CONNCETED SUCCESSFULLY")
// })

// import mongoose from "mongoose";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database `);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

// export default connectDB;
module.exports = connectDB;
