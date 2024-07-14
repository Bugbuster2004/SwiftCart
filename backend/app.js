const express = require("express");
const app = express();
const port = 5000;
const jwt = require("jsonwebtoken")
const UserModel = require("./models/usermodel")
const jwtkey ="sid";
require("./connection/conn")
app.use(express.json());


app.get("/", (req,res) =>{
    console.log(`Listening on Port ${port}`);
    res.send("Hello World");
})

//__________________register route_________________
app.post("/register", async (req,res)=>{
    const { email, password} = req.body;
    try {
        const existinguser = await UserModel.findOne({email, password});
        if(existinguser){
            console.log(existinguser);
            res.status(400).send("User already exists")      
        
    } 
    const newuser = await UserModel.create(req.body);
    //assigns a token to the user
     jwt.sign({user: newuser}, jwtkey, (err, token) =>{
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
//_________________login route____________________
app.post("/login", async(req,res) =>{
    const {email, password} = req.body;
    try {
        const existinguser = await UserModel.findOne({email, password});
        if(existinguser){
            console.log(existinguser);
            if(existinguser.password === password){
                console.log(existinguser.password);
                console.log(password);
                jwt.sign({ user: existinguser }, jwtkey, (err, token) => {
                    if (err) {
                      return res.send({ result: "user not found from jwt sign" });
                    }
                    res.status(200).send({ existinguser, auth: token });
                  });
                //   res.status(200).send({ existinguser, auth: token });


            }
        
            
    } else{
        res.status(400).send("User not found")
    }
}catch (error) {
    res.status(400).send({message:error.message})
        
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });