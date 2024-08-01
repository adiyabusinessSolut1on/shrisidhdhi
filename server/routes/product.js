const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const {Create_Product,GetAll_Product,}=require("../controller/productController")

router.post("/create",isAdmin,Create_Product);
router.get("/",GetAll_Product);



module.exports = router;