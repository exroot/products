import { Router } from "express";
import {
    getAllBatteries,
    getBattery,
    postBattery,
    editBattery,
    deleteBattery,
} from "../controllers/battery.controller";

import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

router.get("/api/v1/batteries", isAuthenticated, getAllBatteries);
router.get("/api/v1/batteries/:battery_id", isAuthenticated, getBattery);
router.post("/api/v1/batteries", isAuthenticated, postBattery);
router.put("/api/v1/batteries/:battery_id", isAuthenticated, editBattery);
router.delete("/api/v1/batteries/:battery_id", isAuthenticated, deleteBattery);

export default router;
