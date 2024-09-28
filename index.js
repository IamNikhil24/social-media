const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectdb = require("./config/connectdb")
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")

connectdb()
const PORT = 8000 || process.env.PORT

app.use(express.json())
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/post", postRoute)

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`)
})