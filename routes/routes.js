const express = require('express');
const multer = require('multer');
const Post = require('./models/post');
const Like = require('./models/like');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Route for saving a new post
router.post('/post', upload.single('image'), async (req, res) => {
    const { user, username, caption } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newPost = new Post({ user, username, image, caption });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error saving post:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route for fetching all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).exec();
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route for handling post likes
router.post('/like', async (req, res) => {
    const { postId, username } = req.body;

    try {
        const like = new Like({ postId, username });
        await like.save();

        // Fetch updated post and return it
        const updatedPost = await Post.findById(postId).exec();
        res.json(updatedPost);
    } catch (err) {
        console.error('Error liking post:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
