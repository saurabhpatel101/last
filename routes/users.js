const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");


//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/', [
    check('firstName', 'Please add name')
        .not()
        .isEmpty(),
    check('lastName', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter the password with atleast 6 or more charcacter')
        .isLength({ min: 6 })
]
    , async (req, res) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            console.log(err);
            return res.status(400).json({ error: err.array() })
        }
        const { firstName, lastName, email, password } = req.body

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User already exist" });
            }
            user = new User({
                firstName,
                lastName,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.status(200).send("Success !")
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    });

module.exports = router;