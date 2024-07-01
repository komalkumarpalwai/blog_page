const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    img: String,
    name: String,
    username: { type: String, unique: true },
    password: String,
    dob: Date,
    bio: String
});

module.exports = mongoose.model('User', UserSchema);
