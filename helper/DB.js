const mongoose = require("mongoose");


 const DB = ()=>{
try {
    mongoose.connect(process.env.DB,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },()=>console.log('connected to DB'))
} catch (error) {
    console.log('error in mongo connection',error);
}
}
module.exports = DB;