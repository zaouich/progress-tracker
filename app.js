const express = require("express")
const app =express()
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const errController = require("./controllers/errController")
const cookieParser = require("cookie-parser")
app.use(cors({
    origin:"*",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/users/",userRouter)
app.use(errController)
module.exports = app