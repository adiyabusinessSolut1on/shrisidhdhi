const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const {Create_Product,GetAll_Product,Update_Product_Id,Delete_Product_Id,
    Get_Product_by_Slug,
    GetProduct_by_Id,
    GetProducts_by_category,
    GetAll_nondraftProduct,
    Product_Draft_status
}=require("../controller/productController");
//Only for Admin 
router.post("/create",isAdmin,Create_Product);
router.put("/:id",isAdmin,Update_Product_Id);
router.put("/draft/:id",isAdmin,Product_Draft_status);
router.get("/all",isAdmin,GetAll_Product);
router.delete("/:id",isAdmin,Delete_Product_Id);

//for User and Admin 
router.get("/",GetAll_nondraftProduct);
router.get("/single/:slug",Get_Product_by_Slug);
router.get("/:id",GetProduct_by_Id);
router.get("/category/:category",GetProducts_by_category);


module.exports = router;