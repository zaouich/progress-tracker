const { default: mongoose, model } = require("mongoose");

const TodoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please choose a todo name"],
        unique : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true , "please choose a todo responsable"],
    },
    status : {
        type : String , 
        default : "not started",
        required : [true , "please choose a status"],
        enum :{
            values : ["not started","started","finished"],
            message : "please provide a valid status"
        }
    },
    project : {
        type : mongoose.Schema.ObjectId,
        ref : 'Project', 
        required : [true , "please choose a project"],
    },
    description :{
        type: String , 
        required : [true , "please enter a description"]
    },
    start : {
        type : Date , 
        required : [true,"please shoose a start date"]
    },
    end :{
        type : Date ,
        required : [true,"please choose an end date"],
        validate : {
            validator : function(val){
                const start = new Date(this.start)
                const end = new Date(val)
                return end > start
            },
            message : "the end date must be greater than the start date"
        }
    }
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
})

TodoSchema.pre(/^find/,function(next){
    this.populate({
        path : "user",
        select : "userName email profile"
    })
    next()
})

const Todo = model("Todo",TodoSchema)




module.exports = Todo