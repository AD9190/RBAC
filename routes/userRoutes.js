const express=require("express");
const router=express.Router();
const verifyToken=require("../middleware/authMiddleware");
const authorizeRoles=require("../middleware/roleMiddleware");
//Only Admin access
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message: "Welcome Admin"});
});
//Both Admin and Moderator access
router.get("/moderator",verifyToken,authorizeRoles("admin","moderator"),(req,res)=>{
    res.json({message: "Welcome Moderator"});
});
//All can access
router.get("/user",verifyToken,authorizeRoles("user","admin","moderator"),(req,res)=>{
    res.json({message: "Welcome User"});
});

module.exports=router;