const { v4: uuid } = require('uuid');
const { uploadFile } = require('../services/storage.service');
const postModel = require('../models/post.model');

async function createPost(req, res) {
    try {
        const { caption } = req.body;
        const picture = req.file;

        if (!picture || !caption) {
            return res.status(400).json({
                message: "Picture and caption are required"
            })
        }

        const fileUploadResult = await uploadFile(picture.buffer, uuid());

        const postCreated = await postModel.create({
            caption,
            picture: fileUploadResult.url,
            user: req.user.id
        })

        return res.status(201).json({
            message: "Post created successfully",
            postCreated
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    createPost
}