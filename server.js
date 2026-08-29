const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = require("./config/db");
const ApplevelMiddleware = require("./middlewares/Applevel.middleware");
const errhandlermiddleware = require("./middlewares/errhandle.middleware");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();

app.use(express.json());

app.use(ApplevelMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Recipe Sharing App API is running"
    });
});

app.use("/recipes", recipeRoutes);

app.use(errhandlermiddleware);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Server startup failed: ${error.message}`);
        process.exitCode = 1;
    }
};

startServer();