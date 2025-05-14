const app = require('./app');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
mongoose.connect(process.env.DB).then(() => console.log("Connect successfull"));
const server = app.listen(3000,() => {
    console.log("App is running at port 3000")
})