const express = require("express");

const env = require('dotenv');

env.config()

const app = express();

app.use(express.json())
//router
app.use("/api",require('./router/router'))

//db
require('./helper/DB')()

app.listen(4000,()=>console.log('app listening on port 4000'))