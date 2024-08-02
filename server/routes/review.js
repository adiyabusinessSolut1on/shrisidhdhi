const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const {
    Create_Review,
    GetAll_Review_By_productId,
    Update_Review,
    Delete_Review,
    Get_ALL_Review,
}=require("../controller/reviewController");

//For Admin
router.get("/",isAdmin,Get_ALL_Review);
router.put("/updated/:id",isAdmin,Update_Review);
router.delete("/delete/:id",isAdmin,Delete_Review)

//For Public
router.post("/create",Create_Review);
router.get("/getall/:productId",GetAll_Review_By_productId);



module.exports = router;