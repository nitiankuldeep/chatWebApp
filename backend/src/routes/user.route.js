import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getMyFriends,getRecomdatedUser} from '../controllers/user.controller.js'

const router=express.Router();
router.use(protectRoute); 

router.get("/",getRecomdatedUser);
router.get("/friends",getMyFriends);


export default router;
 