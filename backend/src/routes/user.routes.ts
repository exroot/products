import { Router } from "express";
import {
    getAllUsers,
    getUser,
    postUser,
    editUser,
    deleteUser,
} from "../controllers/user.controller";

const router: Router = Router();

router.get("/api/v1/users", getAllUsers);
router.get("/api/v1/users/:user_id", getUser);
router.post("/api/v1/users", postUser);
router.put("/api/v1/users/:user_id", editUser);
router.delete("/api/v1/users/:user_id", deleteUser);

export default router;
