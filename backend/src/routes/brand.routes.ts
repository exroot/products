import { Router } from "express";
import {
    getAllBrands,
    getBrand,
    postBrand,
    editBrand,
    deleteBrand,
    getProductsByBrand,
} from "../controllers/brand.controller";
import { isAuthenticated } from "../middlewares/auth";

const router: Router = Router();

router.get("/api/v1/brands", isAuthenticated, getAllBrands);
router.get("/api/v1/brands/:brand_id", isAuthenticated, getBrand);
router.post("/api/v1/brands", isAuthenticated, postBrand);
router.put("/api/v1/brands/:brand_id", isAuthenticated, editBrand);
router.delete("/api/v1/brands/:brand_id", isAuthenticated, deleteBrand);
router.get(
    "/api/v1/brands/:brand_id/batteries",
    isAuthenticated,
    getProductsByBrand
);

export default router;
