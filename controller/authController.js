const asyncHandler = require("express-async-handler")
const User = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All the fields are mandatory")
    }

    if (password.length < 4) {
        res.status(400)
        throw new Error("The minimum length of password should be 4")
    }

    const hashPass = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        username,
        email,
        password: hashPass
    })

    res.status(200)
    res.json({ Message: `Hi ${newUser.username}` })
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error("All the fields are mandatory")
    }

    const result = await User.findOne({ username })
    if (!result) {
        res.status(400)
        throw new Error("User is not Registered, please register first")
    }

    if (await bcrypt.compare(password, result.password)) {
        const token = jwt.sign({
            username: {
                username: result.username,
                id: result.id
            }
        }, process.env.SECRET_KEY, { expiresIn: "5m" })
        res.status(201).json({ Message: `Welcome ${result.username}`, token })
    } else {
        res.status(400)
        throw new Error("Invalid Password")
    }
})

module.exports = { register, login }