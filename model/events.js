const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    totalSeat:{
        type:Number
    },
    date:{
        type:Date,
        required:true
    },
    resoursePerson:{
        type:String,
        required:true
    },
   meetUrl:{
        type:String
    },
    audiance:[
        {
            type:String,
            default:["ggg","hhh"]
        }
    ],
    fee:{
        type:String
    }
})
module.exports = mongoose.model('events',eventsSchema);