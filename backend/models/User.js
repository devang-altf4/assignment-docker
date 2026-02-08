const mongoose = require('mongoose');

// user schema for authentication
// keeping it simple - just email and password
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    }
}, {
    timestamps: true // adds createdAt and updatedAt automaticaly
});

module.exports = mongoose.model('User', userSchema);
