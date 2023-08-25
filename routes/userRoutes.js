const { Router } = require("express");
const { login, signUp, uploadProfileImage, resizeImage, checkLogin, checkConfirmed, confirmEmail, forgetPassword, resetPassword, updateMe, updatePassword, deleteMe, logout, checkLoginClt } = require("../controllers/authController");

const router=Router()
router.post("/login",login)
router.post("/signUp",uploadProfileImage,resizeImage,signUp)
router.post("/confirmEmail/:token",confirmEmail)
router.post("/forgetPassword",forgetPassword)
router.post("/resetPassword/:token",resetPassword)
router.post("/updateMe",checkLogin,checkConfirmed,uploadProfileImage,resizeImage,updateMe)
router.post("/updatePassword",checkLogin,checkConfirmed,updatePassword)
router.post("/deleteMe",checkLogin,deleteMe)
router.post("/logout",checkLogin,checkConfirmed,logout)
router.get("/checkLogin",checkLoginClt)

module.exports = router