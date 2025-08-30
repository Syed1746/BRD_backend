const express = require("express");
const bcrypt = require("bcryptjs");
const AuthRouter = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken")
AuthRouter.post("/signup", async function(req, res) {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(403).json({
                message: "Required Fields are not empty"
            })
        }
        const hashed = await bcrypt.hash(password, 10)
        const UserSignup = await User.create({
            username,
            email,
            password: hashed,
            role
        })
        res.status(201).json({
            message: "User Created Successfully"
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

})


AuthRouter.post("/login", async function(req, res) {
    try {
        const { usernameOrEmail, email, username, password } = req.body;

        // Use whichever field is provided
        const identifier = usernameOrEmail || email || username;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }

        const UserFind = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (!UserFind) {
            return res.status(400).json({ message: "No user found" });
        }

        const isMatch = await bcrypt.compare(password, UserFind.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: UserFind._id, role: UserFind.role },
            process.env.JWT_SECRET_PASSWORD, { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: UserFind.role,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = AuthRouter;