
import { pool } from "../config/database.js";

// GET all vehicles
export const getAllVehicles = async () => {
    const result = await pool.query(
        "SELECT id, make, model, year FROM vehicles ORDER BY id"
    );

    return result.rows;
};

// GET vehicle by ID
export const getVehicleById = async (id: number) => {
    const result = await pool.query(
        "SELECT id, make, model, year FROM vehicles WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// POST vehicle
export const createVehicle = async (
    make: string,
    model: string,
    year: number
) => {
    const result = await pool.query(
        `INSERT INTO vehicles (make, model, year)
         VALUES ($1, $2, $3)
         RETURNING id, make, model, year`,
        [make, model, year]
    );

    return result.rows[0];
};

// PUT vehicle
export const updateVehicle = async (
    id: number,
    make: string,
    model: string,
    year: number
) => {
    const result = await pool.query(
        `UPDATE vehicles
         SET make = $1, model = $2, year = $3
         WHERE id = $4
         RETURNING id, make, model, year`,
        [make, model, year, id]
    );

    return result.rows[0];
};

// DELETE vehicle
export const deleteVehicle = async (id: number) => {
    const result = await pool.query(
        `DELETE FROM vehicles
         WHERE id = $1
         RETURNING id, make, model, year`,
        [id]
    );

    return result.rows[0];
};
