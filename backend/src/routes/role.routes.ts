import { Router } from "express";
import {
    getAllRoles,
    getRole,
    postRole,
    editRole,
    deleteRole,
    getUsersByRole,
} from "../controllers/role.controller";

const router: Router = Router();

router.get("/api/v1/roles", getAllRoles);
router.get("/api/v1/roles/:role_id", getRole);
router.post("/api/v1/roles", postRole);
router.put("/api/v1/roles/:role_id", editRole);
router.delete("/api/v1/roles/:role_id", deleteRole);
router.get("/api/v1/roles/:role_id/users", getUsersByRole);

export default router;
