const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    username: { type: String, required: true }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
