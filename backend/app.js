const express = require("express");
const app = express();
const port = 5000;
const jwt = require("jsonwebtoken")
const UserModel = require("./models/usermodel")
require("./connection/conn")
app.use(express.json());


app.get("/", (req,res) =>{
    console.log(`Listening on Port ${port}`);
    res.send("Hello World");
})

//register route
app.post("/register", async (req,res)=>{
    const { email, password} = req.body;
    try {
        const existinguser = await UserModel.findOne({email, password});
        if(existinguser){
            console.log(existinguser);
            res.status(400).send("User already exists")

            
        
    } 
    const newuser = await UserModel.create(req.body);
     jwt.sign({user: newuser}, "secretkey", (err, token) =>{
        if(err){
            console.log("token not found this is from register", err);
            return res.status(401).send("token not found", err);
        }
        else{
            console.log("token creation success");
            return res.status(200).send({message:"User Created Succesfully", user:newuser
                , token:token
            })
        }
    })
}catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
        
    }

}
)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });