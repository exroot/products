import { Router } from "express";
import {
    getAllRoles,
    getRole,
    postRole,
    editRole,
    deleteRole,
    getUsersByRole,
} from "../controllers/role.controller";

import { isAuthenticated, isAdmin } from "../middlewares/auth";

const router: Router = Router();

router.get("/api/v1/roles", isAuthenticated, isAdmin, getAllRoles);
router.get("/api/v1/roles/:role_id", isAuthenticated, isAdmin, getRole);
router.post("/api/v1/roles", isAuthenticated, isAdmin, postRole);
router.put("/api/v1/roles/:role_id", isAuthenticated, isAdmin, editRole);
router.delete("/api/v1/roles/:role_id", isAuthenticated, isAdmin, deleteRole);
router.get(
    "/api/v1/roles/:role_id/users",
    isAuthenticated,
    isAdmin,
    getUsersByRole
);

export default router;
