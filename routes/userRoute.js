const express = require("express")
const { updateUser, deleteUser, follow, unfollow } = require("../controller/userController")
const verifyToken = require("../middlewares/verifyToken")
const router = express.Router()

router.use(verifyToken)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)
router.post("/:id/follow", follow)
router.post("/:id/unfollow", unfollow)

module.exports = router