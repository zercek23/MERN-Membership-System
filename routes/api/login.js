const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/User');

// @route   GET api/login
// @desc    Get All Users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users));
});

// @route   GET api/login
// @desc    Get An User
// @access  Public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ msg: "User did not found!", success: false }));
});

// @route   POST api/login
// @desc    Login An User
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
    let user = User.find({ email: email });
    if (!user) {
        return res.status(400).json({
            message: "User Not Exist"
        });
    }
    console.log(user);


    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Incorrect Password !"
        });
    }
    else {
        return res.status(200).json({ msg: "Login is succesful!"});
    }    

});

// // @route   DELETE api/login/:id
// // @desc    Delete An User
// // @access  Public
// router.put('/:id', (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     User.findById(req.params.id)
//         .then(user => user.update(newUser).then(() => res.json({ msg: "User Updated", success: true })))
//         .catch(err => res.status(404).json({ msg: "ERROR", success: false }));
// });

// // @route   DELETE api/login/:id
// // @desc    Delete An User
// // @access  Public
// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({ msg: "User Deleted", success: true })))
//         .catch(err => res.status(404).json({ msg: "ERROR", success: false }));
// });

module.exports = router;