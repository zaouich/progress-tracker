const express = require("express")
const app =express()
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const errController = require("./controllers/errController")
const cookieParser = require("cookie-parser")
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.static("public"))

app.use(express.json())
app.use(cookieParser())
app.use((req,res,next)=>{
    console.log(req.cookies)
    next()
})
app.use("/api/v1/users/",userRouter)
app.use(errController)
module.exports = app