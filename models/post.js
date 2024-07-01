
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: String,
    username: String,
    image: String,
    caption: String,
    likes: { type: Number, default: 0 } 
});

module.exports = mongoose.model('Post', postSchema);
