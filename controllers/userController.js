import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // 1️⃣ Validate fields
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // 3️⃣ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            role: role || "model",
            isProfileComplete: false
        });

        // 5️⃣ Response
        res.status(201).json({
            success: true,
            message: "Signup successful",
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).josn({
                success: false,
                message: "All filled are required"
            })
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: message.error
        })

    }
}