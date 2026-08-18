import express from "express";

// create app and have it call the express function.
// should return an 'app' object 
const app = express();

app.get("/", (req, res) => {
    res.send("Vehicle Service Platform API is running");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok", 
        service: "vehicle-service-platform"
    });
});

export default app;