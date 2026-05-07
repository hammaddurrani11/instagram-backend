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
        const userId = req.user.id;

        const profilePicture = req.file;

        if (id != userId) {
            return res.status(403).json({
                message: "You are not authorized to perform this action",
                success: false
            })
        }

        const updateData = {};

        if (username) {
            updateData.username = username;
        }

        if (bio) {
            updateData.bio = bio;
        }

        if (profilePicture) {
            const uploadedFile = await uploadFile(
                profilePicture.buffer,
                uuid(),
                userId
            );

            updateData.profilePicture = uploadedFile.url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
            success: true
        })
    }
    catch (error) {
        console.error(error);
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