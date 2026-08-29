import type { Request, Response } from "express";

export const getVehicles = (
    req: Request, 
    res: Response
) => {
    res.json({
        message: "Vehicles route is working"
    });
};


export const getVehicleByID = (
    req: Request, 
    res: Response
) => {
    res.json({
        message: "Requested vehicle",
        vehicleId: req.params.id
    });
};

export const createVehicle = (
    req: Request,
    res: Response
) => {
    res.json({
        message: "Vehicle received",
        vehicle: req.body
    });
};