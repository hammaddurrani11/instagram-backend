const userModel = require('../models/user.model');
const { uploadFile } = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        return res.status(200).json({
            message: "User fetched successfully",
            user,
            success: true
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function editUser(req, res) {
    try {
        const { username, bio } = req.body;
        const { id } = req.params;
        const profilePic = req.file;

        const uploadedFile = await uploadFile(profilePic.buffer, uuid(), req.user.id);

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            username,
            bio,
            profilePic: uploadedFile.url
        }, { new: true });

        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = {
    getUserById,
    editUser
}