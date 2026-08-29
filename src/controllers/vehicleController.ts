import type { Request, Response } from "express";

// Main GET method
export const getVehicles = (
    req: Request, 
    res: Response
) => {
    res.json({
        message: "Vehicles route is working"
    });
};

// specific GET method
export const getVehicleByID = (
    req: Request, 
    res: Response
) => {
    res.json({
        message: "Requested vehicle",
        vehicleId: req.params.id
    });
};

// POST Method
export const createVehicle = (
    req: Request,
    res: Response
) => {
    res.json({
        message: "Vehicle received",
        vehicle: req.body
    });
};

// PUT Method
export const updateVehicle = (
    req: Request,
    res: Response
) => {
    res.json({
        message: "Vehicle update received",
        vehicleId: req.params.id,
        updates: req.body
    });
};

// Delete Method
export const deleteVehicle = (
    req: Request,
    res: Response
) => {
    res.json({
        message: "Vehicle delete received",
        vehicleId: req.params.id
    });
};