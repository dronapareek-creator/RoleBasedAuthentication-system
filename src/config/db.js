import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Database connection error:", error.message);
        throw error
    }
}