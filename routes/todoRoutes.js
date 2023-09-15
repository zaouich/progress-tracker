const { checkProjectAdmin } = require("../controllers/ProjectController")
const { checkLogin } = require("../controllers/authController")
const { createTodo, updateTodo, deleteTodo, getOneTodo, updateStatus, getOneTodoAsOwner } = require("../controllers/todoController")

const router = require("express").Router({
    mergeParams:true
})
router.route("/").post(checkLogin,checkProjectAdmin,createTodo)
router.route("/:id/owner").get(checkLogin,getOneTodoAsOwner)
router.route("/:id").put(checkLogin,checkProjectAdmin,updateTodo).delete(checkLogin,checkProjectAdmin,deleteTodo).get(checkLogin,checkProjectAdmin,getOneTodo).patch(checkLogin,updateStatus)

module.exports = router