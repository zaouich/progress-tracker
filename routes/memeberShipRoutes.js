const { Router } = require("express");
const { checkLogin } = require("../controllers/authController");
const { checkProjectFoundByName, checkProjectAdmin } = require("../controllers/ProjectController");
const { joinProject, getAllJoinedProjects, leaveProject, getMemebersAsAnAdmin, kickMember,  } = require("../controllers/MemeberShipController");

const memeberShipRouter =Router()
const mergedMemeberShipRouter =Router(
    {mergeParams : true}

)
mergedMemeberShipRouter.route("/").get(checkLogin,checkProjectAdmin,getMemebersAsAnAdmin).delete(checkLogin,leaveProject)
mergedMemeberShipRouter.route("/:memeberShipId").delete(checkLogin,checkProjectAdmin,kickMember)

memeberShipRouter.use(checkLogin)
memeberShipRouter.route("/").post(checkProjectFoundByName,joinProject).get(getAllJoinedProjects)
module.exports = {memeberShipRouter,mergedMemeberShipRouter}