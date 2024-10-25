const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { jwtSecret } = require('../config/auth');


const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ status: 0, message: 'Profile image is required.' });
        }

        const user = await users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ status: 0, message: 'User not found.' });
        }

        // Update user's profile image path in the database
        const profileImagePath = req.file.path; // Get the file path
        await user.update({ profile_pic: profileImagePath });

        res.status(200).json({
            status: 1,
            message: 'Profile image uploaded successfully.',
            user_info: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                profile_pic: profileImagePath, // Return updated profile picture URL
            },
        });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 0, message: 'Validation failed.', errors: errors.array() });
    }

    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(404).json({ status: 0, message: 'Phone number and password are required.' });
        }
        
        const user = await users.findOne({ where: { phone } });
        
        if (!user) {
            return res.status(404).json({ status: 0, message: 'User not found with this phone number.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ status: 0, message: 'Incorrect password. Please try again.' });
        }

        const token = jwt.sign(
            { id: user.id, phone: user.phone },
            jwtSecret,
            { expiresIn: '15h' }
        );

        res.status(200).json({
            status: 1,
            message: 'Login successful',
            token,
            user_info: {
                id: user.id,
                name: user.name,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 0, message: 'Validation failed.', errors: errors.array() });
    }

    
    try {
        const { name, phone, password } = req.body;

    console.log(password);

        if (!name || !phone || !password) {
            return res.status(400).json({ status: 0, message: 'All fields are required.' });
        }

        const existingUser = await users.findOne({ where: { phone } });
        if (existingUser) {
            return res.status(404).json({
                status: 0,
                message: 'Phone number is already registered. Please use a different number.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserEntry = await users.create({
            name,
            phone,
            password: hashedPassword,
        });

        res.status(201).json({
            status: 1,
            message: 'User created successfully',
            user_info: {
                id: newUserEntry.id,
                name: newUserEntry.name,
                phone: newUserEntry.phone,
            },
        });
    } catch (error) {
        console.error('Error creating new User:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ status: 0, message: 'User not found.' });
        }

        res.status(200).json({
            status: 1,
            message: 'User information retrieved successfully.',
            user
        });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 0, message: 'Validation failed.', errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const { name, phone, password, bod, profile_pic, subscriptionId } = req.body;

        const user = await users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ status: 0, message: 'User not found.' });
        }

        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (phone) updatedFields.phone = phone;
        if (bod) updatedFields.bod = bod; 
        if (profile_pic) updatedFields.profile_pic = profile_pic;
        if (subscriptionId) updatedFields.subscriptionId = subscriptionId; 
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10); 
        }

        await user.update(updatedFields);

        res.status(200).json({
            status: 1,
            message: 'User information updated successfully.',
            user_info: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                bod: user.bod,
                profile_pic: user.profile_pic, 
                subscriptionId: user.subscriptionId,
            },
        });
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


const updatePassword = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 0, 
            message: 'Validation failed.', 
            errors: errors.array() 
        });
    }

    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(404).json({ 
                status: 0, 
                message: 'Phone number and password are required.' 
            });
        }

        const user = await users.findOne({ where: { phone: phone } });

        if (!user) {
            return res.status(404).json({ 
                status: 0, 
                message: 'User not found.' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await user.update({ password: hashedPassword });

        res.status(200).json({
            status: 1,
            message: 'Password reset successfully.',
            user_info: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                bod: user.bod,
                profile_pic: user.profile_pic,
                subscriptionId: user.subscriptionId,
            },
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            status: 0,
            message: 'Something went wrong.',
            error: error.message,
        });
    }
};



module.exports = {
    loginUser,
    createUser,
    updateUser,
    getUserInfo,
    uploadProfileImage,
    updatePassword
};
