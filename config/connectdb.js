const mongoose = require("mongoose")

const connectdb = () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/social-media")
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database not connected!")
    }
}

module.exports = connectdb