import app from "./src/app.js";
import dotenv, { config } from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})