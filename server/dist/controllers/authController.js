import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, userStore } from '../models/index.js';
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }
        // Trim inputs
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        // Validate name
        if (trimmedName.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters long'
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }
        // Check if user exists
        const existingUser = await userStore.findOne((user) => user.email === trimmedEmail);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = await userStore.create(new User({
            name: trimmedName,
            email: trimmedEmail,
            password: hashedPassword,
            role: 'user'
        }));
        sendTokenResponse(user, 201, res);
    }
    catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }
        const trimmedEmail = email.trim().toLowerCase();
        // Check for user
        const user = await userStore.findOne((user) => user.email === trimmedEmail);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        sendTokenResponse(user, 200, res);
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await userStore.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            success: true,
            data: userWithoutPassword
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
// Get token from user, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is required');
    }
    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: (process.env.JWT_EXPIRE || '30d')
    });
    const { password, ...userWithoutPassword } = user;
    res.status(statusCode).json({
        success: true,
        token,
        user: userWithoutPassword
    });
};
