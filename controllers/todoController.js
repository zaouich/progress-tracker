const Todo = require("../models/todoModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const createTodo = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { name, user, description, start, end } = req.body;
  const todo = await Todo.create({
    name,
    user,
    description,
    project: projectId,
    start,
    end,
  });
  res.status(201).json({
    status: "success",
    todo,
  });
});
const updateTodo = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const allowed = ["name", "user", "description", "start", "end", "status","project"];
  Object.keys(req.body).map((el) => {
    if (!allowed.includes(el)) delete req.body[el];
  });
  console.log("xxxxxxxxxxxxxxx", req.body, "xxxxxxxxxx");
  const todo = await Todo.findOneAndReplace(
    {
      project: req.params.projectId,
      _id: req.params.id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!todo) return next(new AppError("No todo found with that id", 404));
  res.status(200).json({
    status: "success",
    todo,
  });
});
const deleteTodo = catchAsync(async (req, res, next) => {
  const user = req.user;
  const {password} = req.body;
  if(!password) return next(new AppError("Please provide your password", 400));
  if(!await user.isCorrectPassword(password)) return next(new AppError("Incorrect password", 400));
  const todo = await Todo.findOneAndDelete({
    project: req.params.projectId,
    _id: req.params.id,
  });
  if (!todo) return next(new AppError("No todo found with that id", 404));
  res.status(204).json({
    status: "success",
    message: "todo deleted",
  });
});

const getOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({
    project: req.params.projectId,
    _id: req.params.id,
  });
  if (!todo) return next(new AppError("No todo found with that id", 404));
  res.status(200).json({
    status: "success",
    todo,
  });
});
module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getOneTodo,
};
