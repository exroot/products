import { Router } from "express";
import {
    getAllGroups,
    getGroup,
    postGroup,
    editGroup,
    deleteGroup,
    getProductsByGroup,
} from "../controllers/group.controller";
import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

router.get("/api/v1/groups", isAuthenticated, getAllGroups);
router.get("/api/v1/groups/:group_id", isAuthenticated, getGroup);
router.post("/api/v1/groups", isAuthenticated, postGroup);
router.put("/api/v1/groups/:group_id", isAuthenticated, editGroup);
router.delete("/api/v1/groups/:group_id", isAuthenticated, deleteGroup);
router.get(
    "/api/v1/groups/:group_id/batteries",
    isAuthenticated,
    getProductsByGroup
);

export default router;
