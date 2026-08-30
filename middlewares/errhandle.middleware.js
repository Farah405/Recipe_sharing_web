// Global error handling middleware
// Must have 4 parameters (err, req, res, next) for Express to recognize it as an error handler
const errHandle = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal server error",
        // Show stack trace only in development mode
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

module.exports = errHandle;
