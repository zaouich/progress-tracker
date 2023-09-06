const { Router } = require("express");
const { checkLogin } = require("../controllers/authController");
const { checkProjectFoundByName } = require("../controllers/ProjectController");
const { joinProject, getAllJoinedProjects, leaveProject,  } = require("../controllers/MemeberShipController");

const memeberShipRouter =Router()
const mergedMemeberShipRouter =Router(
    {mergeParams : true}

)
mergedMemeberShipRouter.route("/").delete(checkLogin,leaveProject)

memeberShipRouter.use(checkLogin)
memeberShipRouter.route("/").post(checkProjectFoundByName,joinProject).get(getAllJoinedProjects)
module.exports = {memeberShipRouter,mergedMemeberShipRouter}