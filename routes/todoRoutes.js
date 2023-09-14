const { checkProjectAdmin } = require("../controllers/ProjectController")
const { checkLogin } = require("../controllers/authController")
const { createTodo, updateTodo, deleteTodo, getOneTodo } = require("../controllers/todoController")

const router = require("express").Router({
    mergeParams:true
})
router.route("/").post(checkLogin,checkProjectAdmin,createTodo)
router.route("/:id").patch(checkLogin,checkProjectAdmin,updateTodo).delete(checkLogin,checkProjectAdmin,deleteTodo).get(checkLogin,checkProjectAdmin,getOneTodo)
module.exports = router