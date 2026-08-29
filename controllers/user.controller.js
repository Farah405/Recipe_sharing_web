const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config({ path: "../config.env" });

exports.register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                msg: "Password and Confirm Password do not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.secret_key,
            {
                expiresIn: "15m"
            }
        );

        res.status(201).json({
            user,
            token
        });

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                msg: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.secret_key,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            token
        });

    } catch (err) {
        next(err);
    }
};