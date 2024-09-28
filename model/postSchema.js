const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Post = mongoose.model("post", postSchema)
module.exports = Post