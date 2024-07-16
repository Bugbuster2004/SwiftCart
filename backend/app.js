const express = require("express");
const app = express();
const port = 5000;
const jwt = require("jsonwebtoken");
const UserModel = require("./models/usermodel");
// const jwtkey ="sid";
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
require("./connection/conn");
app.use(express.json());

app.get("/", (req, res) => {
  console.log(`Listening on Port ${port}`);
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
