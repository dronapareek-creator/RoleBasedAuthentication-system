import express from "express";
import authRouter from "./Routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
export default app;