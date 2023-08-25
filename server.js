const app = require("./app")
const mongoose = require("mongoose")

const dotenv = require("dotenv").config({path:"./config.env"})

const DB = process.env.DB
app.listen(3000,()=>{
    console.log("listning to the port 3000......")
    mongoose.connect(DB).then(()=>{
        console.log("connected to the db !")
    })
})