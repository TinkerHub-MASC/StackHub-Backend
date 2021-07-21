const mongoose = require("mongoose");

const {ObjectId} = mongoose.SchemaTypes;

const eventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'offline'
    },

    totalSeat: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    resoursePerson: {
        type: String,
        required: true
    },
    meetUrl: {
        type: String
    },
    pic: {
        type: String
    },
    location: {
        type: String
    },
    fee: {
        type: Number
    },
    booked:[{
        type:ObjectId,
        ref:'user',
        uniuqe:true
    }]
})
module.exports = mongoose.model('events', eventsSchema);