import express from "express";
import healthRoutes from "./routes/healthRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

// create app and have it call the express function.
// should return an 'app' object 
const app = express();

app.get("/", (req, res) => {
    res.send("Vehicle Service Platform API is running");
});

app.use("/health", healthRoutes);
app.use("/vehicles", vehicleRoutes);

export default app;