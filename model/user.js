const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        uniuqe:true
    },
  password:{
      type:String,
      required:true
  },
  isVerfiyed:{
      type:Boolean,
      default:false
  }

})

module.exports = mongoose.model("user",userSchema);