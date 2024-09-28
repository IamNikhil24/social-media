const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

module.exports = asyncHandler(async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if (!token) {
        res.status(404);
        res.json({ Message: "Auth token is missing" })
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(404);
            res.json({ Message: "Invalid Token" })
        } else {
            req.body.id = decode.id
            next()
        }
    })
})