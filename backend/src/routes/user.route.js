import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getMyFriends,getRecomdatedUser,sendFriendRequest,acceptFriendRequest,getFriendRequest,outgoingfriendRequest } from '../controllers/user.controller.js'

const router=express.Router();
router.use(protectRoute); 

router.get("/",getRecomdatedUser);
router.get("/friends",getMyFriends);
router.post("/friend-request/:idx",sendFriendRequest);
router.put("/friend-request/:idx/accept",acceptFriendRequest);
router.get("/friend-request",getFriendRequest);
router.get("/outgoing-friend-request",outgoingfriendRequest);

 
export default router;
  