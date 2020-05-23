import { Router } from "express";
import {
    loginUser,
    logoutUser,
    generateNewTokens,
} from "../controllers/auth.controller";

import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

router.post("/api/v1/auth", loginUser);
router.post("/api/v1/auth/token", generateNewTokens);
router.post("/api/v1/auth/logout", logoutUser);

export default router;
