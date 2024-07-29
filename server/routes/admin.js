const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const { Register,Login} = require('../controller/adminController');


router.post('/register', Register);
router.post("/login",Login);
// router.get("/get-myself",isAdmin,GetData);
// router.put("/update-profile",isAdmin,UpdateProfile);
// router.post("/forgetpassword",ForGetPassword);
// router.post("/verifyotp",VeriFyOTP)

module.exports = router;