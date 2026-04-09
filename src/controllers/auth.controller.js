const userModel = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

        res.cookie("token", token);

        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    registerUser
}