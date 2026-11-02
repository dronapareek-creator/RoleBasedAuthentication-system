import userModel from "../models/auth.model.js";


export async function registerUser(req, res) {
    try {

        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({
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
            return res.status(401).json({
                message: "User is already exists"
            })
        }

        const newUser = await userModel.create({
            username, email, password
        })
        return res.status(201).json({
            message: "User is registered Successfully",
            newUser
        });

    } catch (error) {
        console.error(error)
    }
}