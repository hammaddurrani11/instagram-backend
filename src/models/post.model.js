const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

})

const post = mongoose.model("post", postSchema);
module.exports = post;