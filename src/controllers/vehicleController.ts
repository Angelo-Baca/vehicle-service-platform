import type { Request, Response } from "express";
import { 
    getAllVehicles, 
    getVehicleById,
    createVehicle as createVehicleService,
    updateVehicle as updateVehicleService,
    deleteVehicle as deleteVehicleService 
} from "../services/vehicleService.js";

// Main GET method
export const getVehicles = (
    req: Request, 
    res: Response
) => {
    const vehicleList = getAllVehicles();
    res.json({
        message: vehicleList
    });
};

// specific GET method
export const getVehicleByID = (
    req: Request, 
    res: Response
) => {
    // Express gives the below as "2" this gets converted 
    // before the service layer here Number("2") is 2
    const id = Number(req.params.id);

        // if vehicle entered is NaN handle erro
    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    // Call the service function using the id above 
    // and store whatever it finds in vehicle
    const vehicle = getVehicleById(id);
    
    // if vehicle doesn't exist return 404 error
    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    // send object back to browser
    res.json(vehicle);
};

// POST Method
export const createVehicle = (
    req: Request,
    res: Response
) => {
    const newVehicle = createVehicleService(
        req.body.make,
        req.body.model,
        req.body.year
    );

    res.status(201).json(newVehicle)
};

// PUT Method
export const updateVehicle = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const updated = updateVehicleService(
        id,
        req.body.make,
        req.body.model,
        req.body.year
    );

    if(!updated) {
        return res.status(404).json({
            message: "Cannot update vehicle"
        });
    }

    res.status(200).json(updated)
};

// Delete Method
export const deleteVehicle = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    const deleted = deleteVehicleService(id);
    if (!deleted) {
        return res.status(404).json({
            message: "Cannot delete vehicle"
        })
    }

    return res.status(200).json(deleted);
    
};