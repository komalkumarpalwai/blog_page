const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use((req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
});

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('pages/feed', {
            title: 'Feed Page',
            user: user
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server Error');
    }
});

// Route for logging out
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
    });
});

module.exports = router;
