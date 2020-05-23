import { Router } from "express";
import {
    getAllUsers,
    getUser,
    postUser,
    editUser,
    deleteUser,
} from "../controllers/user.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const router: Router = Router();

router.get("/api/v1/users", isAuthenticated, isAdmin, getAllUsers);
router.get("/api/v1/users/:user_id", isAuthenticated, isAdmin, getUser);
router.post("/api/v1/users", isAuthenticated, isAdmin, postUser);
router.put("/api/v1/users/:user_id", isAuthenticated, isAdmin, editUser);
router.delete("/api/v1/users/:user_id", isAuthenticated, isAdmin, deleteUser);

export default router;
