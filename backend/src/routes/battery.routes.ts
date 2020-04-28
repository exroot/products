import { Router } from "express";
import {
    getAllBatteries,
    getBattery,
    postBattery,
    editBattery,
    deleteBattery,
} from "../controllers/battery.controller";

const router: Router = Router();

router.get("/api/v1/batteries", getAllBatteries);
router.get("/api/v1/batteries/:battery_id", getBattery);
router.post("/api/v1/batteries", postBattery);
router.put("/api/v1/batteries/:battery_id", editBattery);
router.delete("/api/v1/batteries/:battery_id", deleteBattery);

export default router;
