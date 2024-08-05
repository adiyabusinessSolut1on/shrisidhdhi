const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const { Register,Login,LoginVerify,handleLogoutController,getAdmin,ChnagePassword,ForGetPassword,UpdateProfile,VeriFy_ForGetPassword_OTP,VeriFy_ChnagePassword_OTP} = require('../controller/adminController');


router.post('/register', Register);
router.post("/login",Login);
router.post("/login/verify",LoginVerify)
router.get("/",isAdmin,getAdmin);
router.post("/forget/password",ForGetPassword)
router.post("/forgetpassword/verify",VeriFy_ForGetPassword_OTP);
router.post("/change/password",isAdmin,ChnagePassword);
router.post("/changespassword/verify",isAdmin,VeriFy_ChnagePassword_OTP)
router.put("/update/profile",isAdmin,UpdateProfile);
router.post("/logout",handleLogoutController)

module.exports = router;