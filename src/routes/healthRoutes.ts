import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        status: "ok", 
        service: "vehicle-service-platform"
    });
});

export default router;

