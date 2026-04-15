const userModel = require('../models/user.model');

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

module.exports = {
    getUserById
}