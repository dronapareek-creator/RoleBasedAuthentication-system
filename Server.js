import app from "./src/app.js";
import dotenv, { config } from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})