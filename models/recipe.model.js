const mongoose = require("mongoose");

// Define the recipe schema with all required fields
const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            // Array of strings, each item is one ingredient
            type: [String],
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        // Filter feature
        category: {
            type: String,
            enum: ["breakfast", "lunch", "dinner", "dessert", "snack", "other"],
            default: "other",
        },
        imageUrl: {
            type: String,
            default: "",
        },
        // Used by Person 5 - My Recipes feature
        // References the User model to know who created this recipe
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
