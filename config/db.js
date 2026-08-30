const mongoose = require("mongoose");

// Connect to MongoDB using the URI from environment variables
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        // Exit the process if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
