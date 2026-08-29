import type { Request, Response } from "express";

const getVehicleByID = (
    req: Request, 
    res: Response
) => {
    res.json({
        message: "Requested vehicle",
        vehicleId: req.params.id
    });
};

export default getVehicleByID;