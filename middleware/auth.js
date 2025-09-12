const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

module.exports = (roles = []) => {
    return async(req, res, next) => {
        try {
            const authHeader = req.header("Authorization");

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "No token provided" });
            }

            const token = authHeader.split(" ")[1]; // safer than replace
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            // Attach employee info if available
            const employee = await Employee.findOne({ email: user.email });

            req.user = {
                id: user._id.toString(),
                employee_id: employee ? employee._id.toString() : null,
                role: user.role,
                email: user.email,
            };

            // Role check
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (err) {
            console.error("Auth error:", err.message);
            res.status(401).json({ message: "Unauthorized", error: err.message });
        }
    };
};