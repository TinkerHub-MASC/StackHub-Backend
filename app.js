const express = require("express");

const env = require('dotenv');

const {verifyAdminAccessToken} = require('./helper/jwt_helper')

const morgon = require('morgan')

env.config()

const PORT = process.env.PORT;

const app = express();

app.use(morgon('dev'))

app.use(express.json());

//router
app.use("/admin",verifyAdminAccessToken,require('./router/adminRouter'));

app.use("/auth",require('./router/authRouter'));


//db
require('./helper/DB')()

app.listen(PORT,()=>console.log(`app listening on Port ${PORT}`))
