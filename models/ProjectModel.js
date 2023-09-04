const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")
const ProjectSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,"why no name"],
        unique :true
    },
    description:{
        type : String,
        required : [true,"please enter a description"]
    },
    admin :{
        type:mongoose.Schema.ObjectId,
        ref : "User"
    },
    password : {
        type:String,
        required:[true,"please choose a password for you project"]
    },
    confirmPassword : {
        type: String , 
        required : [true,"please confirm the password"],
        validate :{
            validator : function(cp){
                return cp===this.password
            },
            message : "passwords are not match"
        }
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }

})
ProjectSchema.pre("save",async function(next){
    if(this.isModified("password")){
        
        this.confirmPassword = undefined
        this.password =await bcrypt.hash(this.password,12)
    }
    next()
})
ProjectSchema.methods.isCorrectPassword = function(condidate){
    return bcrypt.compare(condidate,this.password)
}
const Project = mongoose.model("Project",ProjectSchema)
module.exports = Project