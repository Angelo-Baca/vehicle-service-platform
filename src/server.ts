import express from "express";

// create app and have it call the express function.
// should return an 'app' object 
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Vehicle Service Platform API is running");
});

app.listen(PORT, () => {
    const dispayMessage: string = `Server is running on port ${PORT}`;
    console.log(dispayMessage);
});
