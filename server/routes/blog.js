const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/aut');
const {Create,update,DeleteBlog,GetAllBlog,getBlogById,getBlogBySlug}=require("../controller/blogController")


//For Admin

router.post("/",isAdmin,Create);
router.put("/:id",isAdmin,update);
router.delete("/:id",isAdmin,DeleteBlog);
router.get("/getbyid/:id",isAdmin,getBlogById);


//for public 


router.get("/",GetAllBlog);
router.get("/single/:slug",getBlogBySlug);



module.exports = router;