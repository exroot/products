import { Router } from "express";
import {
    getAllBrands,
    getBrand,
    postBrand,
    editBrand,
    deleteBrand,
    getProductsByBrand,
} from "../controllers/brand.controller";

const router: Router = Router();

router.get("/api/v1/brands", getAllBrands);
router.get("/api/v1/brands/:brand_id", getBrand);
router.post("/api/v1/brands", postBrand);
router.put("/api/v1/brands/:brand_id", editBrand);
router.delete("/api/v1/brands/:brand_id", deleteBrand);
router.get("/api/v1/brands/:brand_id/batteries", getProductsByBrand);

export default router;
