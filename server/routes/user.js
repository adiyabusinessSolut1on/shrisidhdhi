const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const { Register,Login,GetAllUser,LoginVerify,getUser,ChnagePassword,ForGetPassword,UpdateProfile,VeriFy_ForGetPassword_OTP,VeriFy_ChnagePassword_OTP} = require('../controller/userController');


router.post('/register', Register);
router.post("/login",Login);
router.post("/login/verify",LoginVerify)
router.get("/",isUser,getUser);
router.post("/forget/password",ForGetPassword)
router.post("/forgetpassword/verify",VeriFy_ForGetPassword_OTP);
router.post("/change/password",isUser,ChnagePassword);
router.post("/changespassword/verify",isUser,VeriFy_ChnagePassword_OTP)
router.put("/update/profile",isUser,UpdateProfile);

//for admin
router.get("/all",isAdmin,GetAllUser)


module.exports = router;