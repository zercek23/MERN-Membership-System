const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   POST api/register
// @desc    Register An User
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(user => res.json(user)).catch(err => res.json(err));
});

module.exports = router;