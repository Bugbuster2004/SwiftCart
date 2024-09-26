const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/conn");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const threeRoute = require("./routes/3droute");
const cors = require("cors");
const app = express();

//cong=figure env
dotenv.config();
//configure dc
connectDB();
app.use(cors());
app.use(express.json());
//configuring port
const PORT = process.env.PORT || 3000;
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/3d", threeRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
