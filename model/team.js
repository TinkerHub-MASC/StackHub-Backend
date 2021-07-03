const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc:{
        type:String,
 
    }
})
module.exports = mongoose.model("team",teamSchema);