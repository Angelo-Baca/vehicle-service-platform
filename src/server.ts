import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
    const dispayMessage: string = `Server is running on port ${PORT}`;
    console.log(dispayMessage);
});
