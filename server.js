const express = require("express");
require('dotenv').config();

const app = express();

app.listen(process.env.PORT, ()=>{
    console.log("server is listening at "+process.env.PORT);
});