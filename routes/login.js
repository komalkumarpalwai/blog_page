const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/feed');
    }
    res.render('pages/login', { title: 'Login', errorMessage: null });
});

router.post('/', userController.loginUser);

module.exports = router;
