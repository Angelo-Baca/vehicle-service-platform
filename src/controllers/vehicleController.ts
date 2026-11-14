
import type { Request, Response } from "express";

import {
    getAllVehicles,
    getVehicleById,
    createVehicle as createVehicleService,
    updateVehicle as updateVehicleService,
    deleteVehicle as deleteVehicleService
} from "../services/vehicleService.js";

// GET all vehicles
export const getVehicles = async (
    req: Request,
    res: Response
) => {
    try {
        const vehicleList = await getAllVehicles();

        res.json({
            message: vehicleList
        });
    } catch (error) {
        console.error("Error fetching vehicles:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// GET vehicle by ID
export const getVehicleByID = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    try {
        const vehicle = await getVehicleById(id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        return res.json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// POST vehicle
export const createVehicle = async (
    req: Request,
    res: Response
) => {
    try {
    const newVehicle = await createVehicleService(
        req.body.make,
        req.body.model,
        req.body.year
    );

    return res.status(201).json(newVehicle);
} catch (error) {
    console.error("Error creating vehicle:", error);

    return res.status(500).json({
        message: "Internal server error"
    });
}
};

// PUT vehicle
export const updateVehicle = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    try {
        const updated = await updateVehicleService(
            id,
            req.body.make,
            req.body.model,
            req.body.year
        );

        if (!updated) {
            return res.status(404).json({
                message: "Cannot update vehicle"
            });
        }

        return res.status(200).json(updated);

    } catch (error) {
        console.error("Error updating vehicle:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// DELETE vehicle
export const deleteVehicle = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    // Validate the vehicle ID
    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    try {
        const deleted = await deleteVehicleService(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Cannot delete vehicle"
            });
        }

        return res.status(200).json(deleted);

    } catch (error) {
        console.error("Error deleting vehicle:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};