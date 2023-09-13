const { checkProjectAdmin } = require("../controllers/ProjectController")
const { checkLogin } = require("../controllers/authController")
const { createTodo, updateTodo, deleteTodo } = require("../controllers/todoController")

const router = require("express").Router({
    mergeParams:true
})
router.route("/").post(checkLogin,checkProjectAdmin,createTodo)
router.route("/:id").patch(checkLogin,checkProjectAdmin,updateTodo).delete(checkLogin,checkProjectAdmin,deleteTodo)
module.exports = router