require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const AppMiddleware = require("./middlewares/Applevel.middleware");
const errHandle = require("./middlewares/errhandle.middleware");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();

// Connect to the database
connectDB();

// Apply app-level middlewares (cors, json, urlencoded)
AppMiddleware(app);

// API routes
app.use("/recipes", recipeRoutes);

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "Recipe Sharing API is running" });
});

// Error handler must be the last middleware
app.use(errHandle);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
