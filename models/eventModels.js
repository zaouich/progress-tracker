import mongoose from "mongoose";

const eventSchema = new Schema({
    name : {
        type : String, 
        required:[true,"please provide the name of the event"]
    },
    user :{
        type: mongoose.Schema.ObjectId,
        ref : "User"
    },
    to :{
        type : [String],
        validate :{
            validator : function(ts){
                return ts.length > 0
            },
            message : "you should select at leas one resever"
        }
    },
    dates : {
        type :[Date],
        validate :{
            validator : function(ds){
                return ds.length > 0
            },
            message : "you should select at leas one date"
        }
    },
    subject :{
        type : String,
        required : [true,"please choose the email subject"]
    },
    html : {
        type : String , 
        required: [true,"please choose to html to be sent "]
    }
})
const Event = mongoose.model("Event",eventSchema)
module.exports = Event