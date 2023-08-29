const { default: mongoose, model } = require("mongoose");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    userName : {
        type : String , 
        required : [true,"please provide a username"],
        unique : true
    },
    
    firstName : {
        type : String , 
        required : [true,"please provide your first name"],
    },
    lastName : {
        type : String , 
        required : [true,"please provide your last name"],
    },
    phone : {
        type  : String  ,
        required:[true,"please provide your phone numbze"]
    },
    email : {
        type:  String , 
        required:[true],
        unique : true
    },
    profile: {
        type : String , 
        required:[true,"please choose your  profile image"]
    },
    password : {
        type : String , 
        required : [true , "why no password"]
    },
    confirmPassword : {
        type:String,
        required:[true,"please confirm your password"],
        validate : {
            validator : function(cp){
                return this.password == cp
            },message : "passwords not match"
        }
    },
    active : {
        type : Boolean , 
        default : true
    },
    confirmedEmail : {
        type:Boolean,
        default : false
    },
    changedAt : {
        type : Date
    },
    resetToken : {
        type:String ,

    },expiredResetToken : {
        type: Date
    },
    confirmationResetToken : {
        type : String,
    },
    expiresConfirmationResetToken:{
        type : Date
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.confirmPassword = undefined
        this.password=await  bcrypt.hash(this.password,12)
    }if(this.isModified("password") && ! this.isNew){
        this.changedAt = new Date()
        this.expiredResetToken = undefined
        this.resetToken = undefined
    }
    next()
})
userSchema.pre(/^find/,function(next){
    this.find({active: true})
    next()
})
userSchema.methods.isCorrectPassword = function(provided){
    return bcrypt.compare(provided,this.password)
}
userSchema.methods.isModifiedPassword = function(iat){
    if(!this.changedAt)return false 
    return new Date(this.changedAt)  > iat*1000
}
userSchema.methods.generateConfirmationToken = function(){
    confirmationToken = crypto.randomBytes(32).toString("hex")
    _confirmationToken = crypto.createHash("sha256").update(confirmationToken).digest("hex")
    this.confirmationResetToken = _confirmationToken
    this.expiresConfirmationResetToken = new Date( Date.now()+600000)
    console.log({
        confirmationToken,
        _confirmationToken
    })
    return confirmationToken
}
userSchema.methods.generateResetToken = function(){
    resetToken = crypto.randomBytes(32).toString("hex")
    _resetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetToken = _resetToken
    this.expiredResetToken = Date.now()+600000
    console.log({
        resetToken,
        _resetToken
    })
    return resetToken
}

const User = model("User",userSchema)
module.exports = User