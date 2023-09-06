const Project = require("../models/ProjectModel")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")

const createProject = catchAsync(async(req,res,next)=>{
    const {name,description,password,confirmPassword}= req.body
    const project = await Project.create({name,password,description,confirmPassword,admin:req.user._id})
    res.status(201).json({
        status: "success" , 
        project
    })
})
const updateProject = catchAsync(async(req,res,next)=>{
    const allowed = ["name","description"]
    Object.keys(req.body).map(el=>{
        if(! allowed.includes(el) ) delete req.body[el]
    })
    const project = await Project.findByIdAndUpdate(req.params.projectId,req.body,{new:true,runValidators:true})
    res.status(200).json({
        status : "success",
        project
    })
})
const updateProjectPassword =catchAsync(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmNewPassword} = req.body
    const project = await Project.findById(req.params.projectId)
    if(!oldPassword) return next(new AppError("please provide the old password of the project",400))
    if(!await project.isCorrectPassword(oldPassword)) return next(new AppError("invalide old password",400))
    project.password = newPassword
    project.confirmPassword = confirmNewPassword
    await project.save({
     validateBeforeSave:true
    })
    res.status(201).json({
        status:"success",
        project
    })
})
const deleteProject = catchAsync(async(req,res,next)=>{
    const project = await Project.findById(req.params.projectId)
    const {password} = req.body
    if(!password) return next(new AppError("please provide the  password of the project",400))
    if(!await project.isCorrectPassword(password)) return next(new AppError("invalide project password",400))
    await project.deleteOne()
    res.status(204).json({
        status : "success",
        message : "project deleted"
    })
})
const getAllUsersProject = catchAsync(async(req,res,next)=>{
    const projects = await Project.find({
        admin : req.user._id
    })
    res.status(200).json({
        status : "success" , 
        data : {
            length : projects.length,
            projects
        }
    })
})
const checkProjectAdmin = catchAsync(async(req,res,next)=>{
    const {projectId} =req.params
    const project = await Project.findOne({
        _id:projectId,
        admin : req.user._id
    })
    if(!project) return next(new AppError("no project for you found by that id",404))
    req.project = project
    next()
})
const getOneProjectAsItsAdmin = catchAsync(async(req,res,next)=>{
    const {projectId} =req.params
    const  project =await Project.findById(projectId)
    res.status(200).json({
        status:"success",
        project
    })
})
const checkProjectFoundByName = catchAsync(async(req,res,next)=>{
    const {projectName,projectPassword} = req.body
    if(!projectName) return next(new AppError("please provide the project name" ,404))
    const project = await Project.findOne({name : projectName})
    if(!project || ! await project.isCorrectPassword(projectPassword))  return  next(new AppError("invalid name or password" ,404))
    req.project = project
    next()
})

module.exports = {
    createProject,
    updateProject,
    updateProjectPassword,
    deleteProject,
    getAllUsersProject,
    checkProjectAdmin,
    getOneProjectAsItsAdmin,
    checkProjectFoundByName
}
