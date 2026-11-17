import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    const dispayMessage: string = `Vehicle Service Platform is running on port ${PORT}`;
    console.log(dispayMessage);
});
