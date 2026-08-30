import { error } from "node:console";
import { json } from "node:stream/consumers";

const vehicles = [
    {
        id: 1,
        make: "Toyota",
        model: "Tacoma",
        year: 2004
    },
     {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2022
    },
];

export const getAllVehicles = () => {
    return vehicles;
};

export const getVehicleById = (
    id: number
) => {
    const vehicle = vehicles.find((vehicle) =>
    {
        return vehicle.id === id;
    });
    return vehicle;
};

export const createVehicle = (
    make: string,
    model: string,
    year: number
) => {
   const newVehicle = { 
    id: vehicles.length + 1,
    make,
    model,
    year
   };

   vehicles.push(newVehicle);
   return newVehicle; 
};

export const updateVehicle = (
    id: number,
    make: string,
    model: string,
    year: number
) => {
    const vehicle = getVehicleById(id);

    if(!vehicle) {
        return undefined;
    }

    vehicle.make = make;
    vehicle.model = model;
    vehicle.year = year;

    return vehicle;
};

export const deleteVehicle = (
    id: number
) => {
    const index = vehicles.findIndex((vehicles) => {
        return vehicles.id === id;
    });

    if(index === -1) {
        return undefined;
    }
    const toBeDeleted = vehicles[index];

    vehicles.splice(index, 1);

    return toBeDeleted;
}