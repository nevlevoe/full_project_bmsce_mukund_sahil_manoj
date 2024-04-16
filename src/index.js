//importing
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const bodyParser = require("body-parser");
const { name } = require("ejs");

const app = express();
//converting into json format
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));

// setting ejs as view engine 
app.set('view engine', 'ejs');

//static folder path css 
app.use(express.static("SigninandLogin"));

app.get("/login", (req,res)=>{
    res.render("login");
});

app.get("/signup", (req,res)=>{
    res.render("signup");
});

app.get("/ForgotPassword", (req, res) => {
    res.render("ForgotPassword");
});

// Handle changing password
app.post("/ForgotPassword", async (req, res) => {
    const data = {
        name: req.body.uname,
        password: req.body.psw,
        petname: req.body.pname,
        lastschool: req.body.lschool
    }
    

    try {
        // Find user in the database
        const user = await collection.findOne({ name: data.name });
        //console.log(user.petname);
        //console.log(data.petname);
        //console.log(user.lastschool);
        //console.log(data.lastschool);
        if (!user || user.petname !== data.petname || user.lastschool !== data.lastschool) {
            // User not found or petname and/or lastschool do not match
            res.render("wronglspn");
            return;
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Update the user's password in the database
        await collection.updateOne({ name: data.name }, { $set: { password: hashedPassword } });

        // Password updated successfully
        // res.render("passwordchanged");
        //res.send("Password changed successfully.");
        res.render("egamepage");
    } catch (error) {
        // Handle errors
        console.error("Error changing password:", error);
        // res.render("passwordchangeerror");
        res.send("Cannot change password...");
    }
});


//new user data being read in
app.post('/signup', async (req,res) => {
    const data = {
        name: req.body.uname,
        password: req.body.psw,
        petname: req.body.pname,
        lastschool: req.body.lschool
    }
    const existingUser = await collection.findOne({name: data.name});
    
    if(existingUser){
        // res.send("user already exists . Please choose a different username");
        res.render("sameuser");

    }else{
        const saltRounds = 10;
        const hashP = await bcrypt.hash(data.password, saltRounds);
        
        data.password = hashP;
        //saving the new user
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("egamepage");
    }
    
});
//login user


app.post("/login", async(req,res)=>{
    try{
        const check = await collection.findOne({name: req.body.uname});
        if(!check){
            res.render("nouser");
        }

        //compare the hash password
        const isPasswordMatch = await bcrypt.compare(req.body.psw, check.password);
        if (isPasswordMatch) {
            res.render("egamepage");
        }
        else{
            res.render("wrongpass");
        }
    }
    catch{
        res.render("wrongdetails");
    }
})
const port = 4000;
app.listen(port, () =>{
    console.log('Server is running on Port: ' + port);
});