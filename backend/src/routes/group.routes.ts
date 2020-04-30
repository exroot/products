import { Router } from "express";
import {
    getAllGroups,
    getGroup,
    postGroup,
    editGroup,
    deleteGroup,
    getProductsByGroup,
} from "../controllers/group.controller";

const router: Router = Router();

router.get("/api/v1/groups", getAllGroups);
router.get("/api/v1/groups/:group_id", getGroup);
router.post("/api/v1/groups", postGroup);
router.put("/api/v1/groups/:group_id", editGroup);
router.delete("/api/v1/groups/:group_id", deleteGroup);
router.get("/api/v1/groups/:group_id/batteries", getProductsByGroup);

export default router;
