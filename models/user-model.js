const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('user', userSchema)
