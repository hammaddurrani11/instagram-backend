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
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    })

const post = mongoose.model("post", postSchema);
module.exports = post;