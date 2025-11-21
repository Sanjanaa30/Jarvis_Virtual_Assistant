import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await genToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: 'Strict',
            secure: false
        });


        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Sign Up Error" });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "email does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: 'Strict',
            secure: false
        });


        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        res.status(500).json({ message: "Login Error" });
    }
}

export const Logout = async (req, res) => {
    try {

        res.clearCookie('token');
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        return res.status(500).json({ message: "Logout Error" });
    }
}

