import app from "./src/app.js";
import dotenv, { config } from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`)
        });

    }
    catch (error) {
        console.error("Server StartUp failed:", error.message);
        process.exit(1)
    }
}
startServer();
