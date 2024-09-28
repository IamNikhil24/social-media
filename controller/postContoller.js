const asyncHandler = require("express-async-handler")
const Post = require("../model/postSchema")
const User = require("../model/userSchema")

const createPost = asyncHandler(async (req, res) => {
    const { userid, desc } = req.body
    if (!userid) {
        res.status(403).json({ Message: "All the fields are mandatory" })
    }
    const user = await User.findById(userid)
    if (user) {
        const newPost = await Post.create({
            userid,
            desc
        })
        res.status(201).json({ Message: "Post created!" })
    } else {
        res.status(403).json({ Message: "Invalid UserId" })
    }
})

const updatePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const update = req.body
    const post = await Post.findById(id)
    if (!post) {
        res.status(403).json({ Message: "Invalid postId" })
    } else {
        const ans = await Post.updateOne({ _id: id }, { $set: update })
        res.status(201).json({ Message: "Post updated!" })
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        res.status(403).json({ Message: "Invalid UserId" })
    } else {
        const ans = await Post.deleteOne({ userid: id })
        res.status(201).json({ Message: "Post deleted!" })
    }
})

const likePost = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post.likes.includes(req.body.userid)) {
        await post.updateOne({ $push: { likes: req.body.userid } })
        res.status(201).json({ Message: "You liked this post" })
    } else {
        res.status(403)
        throw new Error("You have already liked this post!")
    }
})

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) {
        res.status(403)
        throw new Error("No such post exists")
    } else {
        res.status(201).json(post)
    }
})

module.exports = { createPost, updatePost, deletePost, likePost, getById }