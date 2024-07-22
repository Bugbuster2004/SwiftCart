const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connection/conn");
const authRoute = require("./routes/authRoute");
const app = express();

//cong=figure env
dotenv.config();
//configure dc
connectDB();
app.use(express.json());
//configuring port
const PORT = process.env.PORT || 3000;
//routes
app.use("/api/v1/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
