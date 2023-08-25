const AppError = require("../utils/AppError")

// deve handler 
const deveHandller = (err,req,res)=>{
    console.log("morad error")
    res.status(err.statusCode || 500).json({
        err,
        status : 'faild',
        message : err.message,
        operational : err.isOperational,
        stack:err.stack
    })
}
// ValidationError handler
const ValidationError=(err)=>{
    const allErros = Object.values(err.errors).map(el=>el.message)
    console.log(allErros , "*************")
     return new AppError(`${allErros.join(' , ')}`,400)
}
// duplicate error
const DuplicateKey=(err)=>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(`duplicate value is : ${value}`,400)
}
const JsonWebTokenError =(err)=>{
    return new AppError("json web token error / please login first",401)
}
const CastError =(err)=>{
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

    return new AppError(`invalid value is ${value} please enter another value`,400)
}
// product handler
const prodHandller = (err,req,res)=>{
    if(err.isOperational) return res.status(err.statusCode ).json({
        status : err.status,
        message:err.message})
    return res.status(500).json({
        status:"error",
        err,
        message:"some thing went very wrong"})

}
const errController = (err,req,res,next)=>{
    if(process.env.NODE_ENV==="deve"){
       return deveHandller(err,req,res)
    }
    if(err.name==="ValidationError") err= ValidationError(err)
    else if(err.code=="11000") err= DuplicateKey(err)
    else if(err.name==="JsonWebTokenError") err = JsonWebTokenError(err)
    else if(err.name==="CastError") err = CastError(err)
    prodHandller(err,req,res) 
}
module.exports = errController