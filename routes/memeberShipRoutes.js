const { Router } = require("express");
const { checkLogin } = require("../controllers/authController");
const { checkProjectFoundByName } = require("../controllers/ProjectController");
const { joinProject, getAllJoinedProjects } = require("../controllers/MemeberShipController");

const router =Router()
router.use(checkLogin)
router.route("/").post(checkProjectFoundByName,joinProject).get(getAllJoinedProjects)
module.exports = router