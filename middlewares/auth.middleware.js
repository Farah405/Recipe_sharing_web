const jwt = require("jsonwebtoken");

// Middleware to protect routes that require authentication
// Checks the Authorization header for a valid Bearer token
const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Reject if no token or wrong format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized. Please login first.",
            });
        }

        // Extract the token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
};

module.exports = { protect };
