import { Router } from "express";

const router: Router = Router();

router.get("/api/v2/", function (req, res, next) {
    res.status(200).json({ msg: "Hi admin" });
});

export default router;
