const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const { CreateCategory ,
    GetAll_Category,
    UpdateCategory,
    DeleteCategory}=require("../controller/categoryController")

router.post("/create",isAdmin,CreateCategory);
router.get("/",GetAll_Category);
router.put("/update/:id",isAdmin,UpdateCategory);
router.delete("/delete/:id",isAdmin,DeleteCategory);


module.exports = router;