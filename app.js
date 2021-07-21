const express = require("express");

const env = require('dotenv');

const {verifyAdminAccessToken,verifyUserAccessToken} = require('./helper/jwt_helper')

const morgon = require('morgan')

env.config()

const PORT = process.env.PORT;

const app = express();

app.use(morgon('dev'))

app.use(express.json());

app.get("/",verifyUserAccessToken,(req,res)=>{
    res.json('hello user')
})

//router
app.use("/admin",verifyAdminAccessToken,require('./router/adminRouter'));

app.use("/auth",require('./router/authRouter'));

app.use("/user",verifyUserAccessToken,require('./router/userRouter'))
//db
require('./helper/DB')()

app.listen(PORT,()=>console.log(`app listening on Port ${PORT}`))
