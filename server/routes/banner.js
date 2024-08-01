const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const {CreateBanner,GetAll_Banner,UpdateBanner,DeleteBanner}=require("../controller/bannerController")

router.post("/create",isAdmin,CreateBanner);
router.get("/",GetAll_Banner);
router.put("/update/:id",isAdmin,UpdateBanner);
router.delete("/delete/:id",isAdmin,DeleteBanner);


module.exports = router;