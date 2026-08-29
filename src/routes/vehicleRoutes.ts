import { Router } from "express";
import { getVehicles, getVehicleByID } from "../controllers/vehicleController.js";
import { createVehicle } from "../controllers/vehicleController.js";


const router = Router();

router.get("/", getVehicles);

router.get("/:id", getVehicleByID);

router.post("/", createVehicle);

export default router;