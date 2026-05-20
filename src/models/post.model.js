const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    picture: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    imageFileId: {
        type: String
    },
    likes: {
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    }
}, {
    timestamps: true
})

const post = mongoose.model("post", postSchema);
module.exports = post;