const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,
    pic: {
        type: String,
        default: "https://res.cloudinary.com/dfnoivn3s/image/upload/v1591945404/eus7m4qevdkbmt5efpui.jpg"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
})

mongoose.model("User", userSchema)