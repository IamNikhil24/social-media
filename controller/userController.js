const asyncHandler = require("express-async-handler")
const User = require("../model/userSchema")
const bcrypt = require("bcrypt")

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const updates = req.body
    const result = await User.findById(id)
    if (!result) {
        res.status(404)
        throw new Error("Please provide a valid userId")
    }

    if (req.body.password) {
        const hashPas = await bcrypt.hash(req.body.password, 10)
        updates.password = hashPas
    }
    const ans = await User.findByIdAndUpdate({ _id: id }, { $set: updates })
    res.status(200).json({ Message: "User updated successfully" })
})

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await User.findById(id)
    if (!result) {
        res.status(404)
        throw new Error("Please provide a valid userId")
    } else {
        const deleteUser = await User.deleteOne({ _id: id })
        if (deleteUser.deletedCount == 1) {
            res.status(201).json("User deleted successfully!")
        } else {
            res.status(400)
            throw new Error("Unable to delete the user at the moment")
        }
    }
})

const follow = asyncHandler(async (req, res) => {
    if (req.body.userid !== req.params.id) {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(403).json({ Message: "The user does not exist!" });
        }
        const currUser = await User.findById(req.body.userid);
        if (!user.followers.includes(req.body.userid)) {
            await user.updateOne({ $push: { followers: req.body.userid } });
            await currUser.updateOne({ $push: { following: req.params.id } });
            return res.status(201).json({ Message: "User followed" });
        } else {
            return res.status(400).json({ Message: "You already follow this user" });
        }
    } else {
        return res.status(403).json({ Message: "You cannot follow yourself!" });
    }
});

const unfollow = asyncHandler(async (req, res) => {
    if (req.body.userid !== req.params.id) {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(403).json({ Message: "The user does not exist!" });
        }
        const currUser = await User.findById(req.body.userid);
        if (user.followers.includes(req.body.userid)) {
            await user.updateOne({ $pull: { followers: req.body.userid } });
            await currUser.updateOne({ $pull: { following: req.params.id } });
            return res.status(201).json({ Message: "User unfollowed" });
        } else {
            return res.status(400).json({ Message: "You cant unfollow this user" });
        }
    } else {
        return res.status(403).json({ Message: "You cannot unfollow yourself!" });
    }
})

module.exports = { updateUser, deleteUser, follow, unfollow }