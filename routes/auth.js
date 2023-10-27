const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as needed
const router = express.Router();

// Sign-Up Route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ username: req.body.username, password: hashedPassword });
        res.redirect('/signin');
    } catch (err) {
        res.redirect('/signup');
    }
});

// Sign-In Route
router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
        res.redirect('/signin');
    }
});

module.exports = router;
