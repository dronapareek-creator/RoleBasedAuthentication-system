
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "artist"],
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });


const userModel = mongoose.model("user",userSchema);

export default userModel;
