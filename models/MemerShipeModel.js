const { default: mongoose, model } = require("mongoose");

const memeberShipSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    project : {
        type : mongoose.Schema.ObjectId,
        ref : 'Project',
    },
    createdAt : {
        type : Date , 
        default : Date.now()
    }
})

memeberShipSchema.pre(/^find/,function(next){
    this.populate("user","userName email profile")
    next()
})
const MemeberShip = model("MemeberShip" , memeberShipSchema)
module.exports = MemeberShip