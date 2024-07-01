const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/feed');
    }
    res.render('pages/register', { title: 'User Registration', errorMessage: null });
});

router.post('/submit', upload.single('img'), userController.registerUser);

module.exports = router;
