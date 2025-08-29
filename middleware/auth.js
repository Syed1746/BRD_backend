const jwt = require("jsonwebtoken");
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                    message: "No Token Provided"
                })
            }
            const token = authHeader.split(" ")[1];
            const decodedId = jwt.verify(token, process.env.JWT_SECRET_PASSWORD)
            req.user = decodedId;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: insufficient rights" });
            }
            next();
        } catch (e) {
            return res.status(403).json({
                message: "Invalid Token"
            })
        }
    }

}
module.exports = authMiddleware;