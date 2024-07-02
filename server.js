const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./connectDB'); // Import the connectDB function
const User = require('./models/user'); 
const Post = require('./models/post'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Use express-session middleware
app.use(session({
    secret: 'mySuperSecretKey123!@#',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true only if using HTTPS
}));

// Connect to MongoDB
connectDB().catch(console.dir);

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Routes for API
// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        res.status(500).json({ error: 'Failed to load posts' });
    }
});

// Create a new post
app.post('/api/post', upload.single('image'), async (req, res) => {
    try {
        const { user, username, caption } = req.body;
        const imgPath = req.file ? `/uploads/${req.file.filename}` : null;

        const newPost = new Post({
            user,
            username,
            image: imgPath,
            caption
        });

        await newPost.save();
        res.json(newPost);
    } catch (error) {
        console.error('Error posting:', error);
        res.status(500).json({ error: 'Failed to post' });
    }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes for web pages
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const feedRouter = require('./routes/feed');

app.use('/', registerRouter);
app.use('/login', loginRouter);
app.use('/feed', feedRouter);

// Error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
