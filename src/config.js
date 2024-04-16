// importing
const mongoose = require("mongoose");
// creating connection
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

//checking dbs connection
connect.then(()=>{
    console.log("dbs connected");
})
.catch(()=>{
    console.log("dbs not connected");
});

//creating schema
const LoginSchema = new mongoose.Schema({
    name:{type : String, required : true},
    password:{type : String, required : true},
    petname:{type : String, required : true},
    lastschool: { type:String, required : true}
});

//collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;