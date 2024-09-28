const express = require("express")
const { createPost, updatePost, deletePost, likePost, getById } = require("../controller/postContoller")
const verifyToken = require("../middlewares/verifyToken")
const router = express.Router()

router.use(verifyToken)
router.route("/").post(createPost)
router.route("/:id").put(updatePost).post(likePost).delete(deletePost).get(getById)

module.exports = router