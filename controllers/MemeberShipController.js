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
module.exports = {joinProject,getAllJoinedProjects}