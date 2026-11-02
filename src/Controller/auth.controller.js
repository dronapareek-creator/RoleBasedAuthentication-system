import userModel from "../models/auth.model.js";


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

        const newUser = await userModel.create({
            username, email, password
        })
        return res.status(201).json({
            success: true,
            message: "User is registered Successfully",
            newUser
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}