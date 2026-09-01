const express = require("express");

require("dotenv").config( {path: "./config.env" });
const connectDB = require("./config/db");

const ApplevelMiddleware = require("./middlewares/Applevel.middleware");
const errorHandler = require("./middlewares/errhandle.middleware");

const userRoutes = require("./routes/user.route");
const recipeRoutes = require("./routes/recipe.route");



const app = express();



connectDB();

app.use(express.json());

app.use(ApplevelMiddleware);


app.use("/auth", userRoutes);

app.use("/recipes", recipeRoutes);



app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});