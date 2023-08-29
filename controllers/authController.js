const multer = require("multer");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

const passPort = (userId,res)=>{
    const JWT_SECRET = process.env.JWT_SECRET
    const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN
    const jwt_ =  jwt.sign({id:userId},JWT_SECRET,{expiresIn :JWT_EXPIRES_IN})
    res.cookie("jwt",jwt_,{
        expires: new Date(Date.now() + process.env.COOKIEEX * 24 * 60 * 60 * 1000),
        httpOnly: true,
  secure: true,
   })
    return jwt_
}
const login = catchAsync(async(req,res,next)=>{
    const {email,password}= req.body
    if(!email) return next(new AppError("please provide your email",400))
    const user = await User.findOne({email})
    if(!user ||! await user.isCorrectPassword(password) ) return next(new AppError("invalid email or password",400))
    res.status(201).json({
    status : "success" , 
        user,
    token : passPort(user._id,res)
})
})

const multerStorage = multer.memoryStorage()
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image")) return cb(null,true)
    else return cb(new AppError("please enter a correct image",400),false)
}
const upload = multer({
    storage : multerStorage ,
    fileFilter:multerFilter
})
const uploadProfileImage = upload.fields([
    {name:'profile',maxCount:1}
])
const resizeImage =(req,res,next) =>{
    if(! req.files || ! req.files.profile || ! req.files.profile[0]) return next()
    req.files.profile[0].filename = `1-${Date.now()}.jpeg`
    sharp(req.files.profile[0].buffer).resize(300,300).toFormat("jpeg").jpeg({quality:90}).toFile(`public/imgs/users/profile/${req.files.profile[0].filename}`)
    next()
}

const signUp = catchAsync(async(req,res,next)=>{
    if(req.files && req.files.profile && req.files.profile[0]) {
        req.body.profile = req.files.profile[0].filename
        console.log(req.body.profile)
    }
    const {userName,firstName,lastName,phone,email,password,profile,confirmPassword,role}=req.body
    const user = await User.create({userName,firstName,lastName,phone,email,password,profile,confirmPassword,role})
    res.status(201).json({
        status : "success",
        user,
        token : passPort(user._id,res)
    })
})
// check login
const checkLogin = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt) return next(new AppError("please login first",401))
    const jwt_ = req.cookies.jwt
    // validate the jwt
    const vrfd = jwt.verify(jwt_,process.env.JWT_SECRET)
    // check the user still exicts
    const user = await User.findById(vrfd.id)
    if(!user) return next(new AppError("the user is no more exicts",401))
    // check the user did not changed his password
    if(await user.isModifiedPassword(vrfd.iat)) return next(new AppError("the user has been changed his password",401))
    req.user = user 
    next()
})
// chek login clt
const checkLoginClt = catchAsync(async(req,res,next)=>{
    if(!req.cookies.jwt) return next(new AppError("please login first",401))
    const jwt_ = req.cookies.jwt
    // validate the jwt
    const vrfd = jwt.verify(jwt_,process.env.JWT_SECRET)
    // check the user still exicts
    const user = await User.findById(vrfd.id)
    if(!user) return next(new AppError("the user is no more exicts",401))
    // check the user did not changed his password
    if(await user.isModifiedPassword(vrfd.iat)) return next(new AppError("the user has been changed his password",401))
    res.status(200).json({
status: "success",
user
})
})
// check + send email confirmation
const checkConfirmed = catchAsync(async(req,res,next)=>{
    if(req.user.confirmedEmail) return next()
    const user = req.user
    const confirmToken = await user.generateConfirmationToken()
    await user.save({validateBeforeSave:false})
    try {
        await sendEmail({to:req.user.email ,subject:"please confirm your email",text:confirmToken})
        res.status(201).json({status:"success",message:"confirmation email has been sent to your inbox"})
    } catch (error) {
        user.expiresConfirmationResetToken = undefined
        user.confirmationResetToken=undefined
        user.save({validateBeforeSave : false})
        res.status(201).json({status:error.statusCode || 500,message:"err during sending email"})
    }
})
const confirmEmail =catchAsync( async(req,res,next)=>{
    const token = req.params.token
    const _token = crypto.createHash("sha256").update(token).digest("hex")
    console.log(_token)
    const user = await User.findOne({
        confirmationResetToken : _token , 
        expiresConfirmationResetToken : {$gt: new Date()}
    })
    if(!user) return next(new AppError("invalid or expires confirmation link",400))
    user.confirmedEmail = true 
    user.expiresConfirmationResetToken = undefined
    user.confirmationResetToken=undefined
    await user.save({validateBeforeSave : false})
    res.status(201).json({
        status: "success", 
        message : "thanks for confirming your password"
    })

})
const forgetPassword = catchAsync(async(req,res,next)=>{
    const {email} = req.body
    if(!email) return next(new AppError("please provide your email",400))
    const user = await User.findOne({email})
    if(!user)return next(new AppError("invalid email adress",404))
    const resetToken = await user.generateResetToken()
    const message_ = `please reset your password by clicking on this link : http://localhost:5173/resetPassword/${resetToken}`
    await user.save({validateBeforeSave : false})
    try {
        await sendEmail({to:user.email ,subject:"please reset your password",text:message_})
        res.status(201).json({status:"success",message:"reset email has been sent to your inbox"})

    } catch (error) {
        user.expiredResetToken = undefined
        user.resetToken=undefined
        user.save({validateBeforeSave : false})
        res.status(201).json({status:error.statusCode || 500,message:"err during sending email"})
    }
})
const resetPassword = catchAsync(async(req,res,next)=>{
    const token = req.params.token
    const _token = crypto.createHash("sha256").update(token).digest("hex")
    
    const user = await User.findOne({
        resetToken:_token,
        expiredResetToken: {$gt : Date.now()}
    })
    if(!user) return next(new AppError("invalide or expired reset link",400))
    const {newPassword,confirmNewPassword} = req.body
    user.password = newPassword
    user.confirmPassword=confirmNewPassword
    await user.save()
    res.status(201).json({status : "success" ,message : "thanks for reseting your password"})
})
const updateMe = catchAsync(async(req,res,next)=>{
    const allowed = ["userName","firstName","lastName","phone","email","profile"]
    if(req.files && req.files.profile[0] && req.files.profile[0].filename.length >0){ 
        allowed.push("profile")
        req.body.profile = req.files.profile[0].filename
    }
    Object.keys(req.body).map(el=>{
        if(! allowed.includes(el)) delete req.body[el]
    })
    const user = await User.findByIdAndUpdate(req.user._id,req.body,{new : true , runValidators:true})
    res.status(201).json({
        status:"success" , 
        user
    })
})
const updatePassword = catchAsync(async(req,res,next)=>{
        const user = req.user
        const {oldPassword,newPassword,confirmNewPassword} = req.body
        if(!oldPassword) return next(new AppError("please provide your old password",400))
        if(!await user.isCorrectPassword(oldPassword)) return next(new AppError("invalid old  password",400))
        user.password = newPassword
        user.confirmPassword =confirmNewPassword
        await user.save()
        res.status(201).json({
            status: "success",
            message : "thanks for changin your password"
        })
})
const deleteMe = catchAsync(async(req,res,next)=>{
    const {password} = req.body
    const user=req.user
    if(!password) return next(new AppError("please provide your  password",400))
    if(!await user.isCorrectPassword(password)) return next(new AppError("invalid old  password",400)) 
    user.active = false
    await user.save({validateBeforeSave : false})
    res.status(201).json({status:"success", message: "your account has been deleted"})
})
const logout =catchAsync(async(req,res,next)=>{
    res.clearCookie("jwt");
    res.status(204).json({status:"success"})
})
module.exports = {login,signUp,uploadProfileImage,resizeImage,checkLogin,checkConfirmed,confirmEmail,forgetPassword,resetPassword,updateMe,updatePassword,deleteMe,logout,checkLoginClt}