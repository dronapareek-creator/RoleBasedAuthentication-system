import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(req, res) {
    try {

        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "User is already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        const token = jwt.sign({
            id: newUser._id,
            role: newUser.role
        }, process.env.JWT_SECRET_KEY)

        res.cookie("token", token)

        return res.status(201).json({
            success: true,
            message: "User is registered Successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });



    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}