const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");

const createTodo =catchAsync(async (req,res,next)=>{
   const {projectId} = req.params
    const {name,user,description,start,end} = req.body
    const todo = await Todo.create({
        name,user,description,project:projectId,start,end
    })
    res.status(201).json({
        status : "success",
        todo
    })
})
const updateTodo = catchAsync(async(req,res,next)=>{
    const allowed  = ["name","user","description","start","end","status"]
    Object.keys(req.body).map(el=>{
        if(! allowed.includes(el) ) delete req.body[el]
    })
    const todo = await Todo.findOneAndUpdate({
        project : projectId,
        _id:req.params.todoId,
    })
    if(!todo) return next(new AppError("No todo found with that id",404))
    res.status(200).json({
        status : "success",
        todo
    })
})
const deleteTodo = catchAsync(async(req,res,next)=>{
    const todo = await Todo.findOneAndDelete({
        project : projectId,
        _id:req.params.todoId,
    })
    if(!todo) return next(new AppError("No todo found with that id",404))
    res.status(204).json({
        status : "success",
        message : "todo deleted"
    })
})
module.exports = {
    createTodo,
    updateTodo,
    deleteTodo
}