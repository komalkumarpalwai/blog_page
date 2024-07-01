const User = require('../models/user');

exports.registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Bad Request: No data received');
    }

    const { name, username, password, dob, bio } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('pages/register', { title: 'User Registration', errorMessage: 'Username already exists.' });
        }

        const newUser = new User({
            img: imgPath,
            name,
            username,
            password,
            dob,
            bio
        });

        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Error saving user:', err.message);
        res.render('pages/register', { title: 'User Registration', errorMessage: 'Server Error. Please try again later.' });
    }
};

exports.loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Bad Request: No data received');
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || password !== user.password) {
            return res.render('pages/login', { title: 'Login', errorMessage: 'Invalid username or password.' });
        }

        req.session.userId = user._id;

        res.redirect('/feed');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server Error');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
    });
};
