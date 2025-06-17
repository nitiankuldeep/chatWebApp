import express from 'express';
import { createGroup, getUserGroups,getGroupById } from '../controllers/group.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute)

router.post('/create', createGroup);
router.get('/mygroups', getUserGroups);
router.get('/groups/:groupId', getGroupById);

export default router;
