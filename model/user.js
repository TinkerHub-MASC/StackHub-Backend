const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    career:{
        type:String,
        default:"Student"
    }

})

module.exports = mongoose.model("user",userSchema);