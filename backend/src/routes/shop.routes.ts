import { Router } from "express";

const router: Router = Router();

router.get("/api/v1/", function (req, res, next) {
    res.status(200).json({ msg: "Hi shop" });
});

export default router;
