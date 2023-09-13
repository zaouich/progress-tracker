const MemeberShip = require("../models/MemerShipeModel");
const Project = require("../models/ProjectModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");



const joinProject = catchAsync(async(req,res,next)=>{
    const project = req.project
    const user = req.user
    const memeberShip_ = await MemeberShip.findOne({
        project : project._id,
        user : user._id
    })
    if(memeberShip_ ||project.admin.toString()==req.user._id.toString()) return next(new AppError("you already joined this project",400))
    const memeberShip = await MemeberShip.create({
        user:user._id,project:project._id
    })
    res.status(201).json({
        status : "success" , 
        memeberShip
    })

})
const getAllJoinedProjects = catchAsync(async(req,res,next)=>{
    const memberShips = await MemeberShip.find({
        user : req.user._id
    }).populate("project")
    res.status(200).json({
        status : "success" ,
        memberShips
    })
})

const leaveProject = catchAsync(async(req,res,next)=>{
    const {password}  = req.body
    const {projectId} = req.params
    const user = req.user
    if(!password) return next(new AppError("please provide your password",400))
    if(!await user.isCorrectPassword(password)) return next(new AppError("incorrect  account password",403))
    const memeberShip = await MemeberShip.findOneAndDelete({
        user : req.user._id , 
        project : projectId
        })  
    if(!memeberShip) return next(new AppError("you are not a memeber in this project",404))
    res.status(204).json({
status : "success",
message : "you have left the project"
})
})
const getMemebersAsAnAdmin = catchAsync(async(req,res,next)=>{
    const members = req.project.memebers
    res.status(200).json({
        status : "success" ,
        data :{
            length : members.length,
            members
        } 
        
    })
})
const kickMember =catchAsync(async(req,res,next)=>{
    const {password} = req.body
    const user = req.user
    if(!password) return next(new AppError("please provide you account password",400))
    if(!await user.isCorrectPassword(password))return next(new AppError("invalid password",400))
    const memeberShip = await MemeberShip.findOneAndDelete({_id:req.params.memeberShipId,project:req.params.projectId})
    if(!memeberShip)return next(new AppError("no memeber ship Found",404))
    res.status(204).json({
        status : "success" , 
        message : "memeberShip deleted"
    })
})


module.exports = {joinProject,getAllJoinedProjects,leaveProject,getMemebersAsAnAdmin,kickMember
}