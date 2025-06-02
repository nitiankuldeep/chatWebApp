import express from "express"
const router=express.Router();
import { signup, login, logout,onboarding } from "../controllers/auth.controller.js";
import { protectRoute  } from "../middleware/auth.middleware.js";

router.post("/signup",signup);
router.post("/login",login);   
router.post("/logout",logout);

router.post("/onboarding",protectRoute ,onboarding);
router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
})

export default router;