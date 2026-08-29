import { Router } from "express";
import getVehicleByID from "../controllers/vehicleController.js";

const router = Router();

router.get("/" , (req, res) => {
    res.json({
        message: "Vehicles route is working" 
    })
});

router.get("/:id", getVehicleByID);

export default router;