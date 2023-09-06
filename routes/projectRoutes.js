const { Router } = require("express");
const { getAllUsersProject, updateProject, checkProjectAdmin, deleteProject, updateProjectPassword, createProject, getOneProjectAsItsAdmin } = require("../controllers/ProjectController");
const { checkLogin } = require("../controllers/authController");
const {mergedMemeberShipRouter} = require("./memeberShipRoutes")
const router = Router()
router.use("/:projectId/memeberShips",mergedMemeberShipRouter)
router.use(checkLogin)
router.route("/").get(getAllUsersProject).post(createProject)
router.route("/:projectId").patch(checkProjectAdmin,updateProject).delete(checkProjectAdmin,deleteProject).get(checkProjectAdmin,getOneProjectAsItsAdmin)
router.route("/:projectId/updatePassword").patch(checkProjectAdmin,updateProjectPassword)

module.exports = router