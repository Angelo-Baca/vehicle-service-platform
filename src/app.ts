
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vehicle Service Platform API is running");
});

app.use("/health", healthRoutes);
app.use("/vehicles", vehicleRoutes);

export default app;
