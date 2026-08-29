const Recipe = require("../models/recipe.model");

// Create Recipe
const createRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.create({
            ...req.body,
            user_id: req.user.id,
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Recipes
const getRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find();

        res.status(200).json({
            count: recipes.length,
            recipes,
        });
    } catch (error) {
        next(error);
    }
};

// Update Recipe
const updateRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Recipe
const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            message: "Recipe deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    updateRecipe,
    deleteRecipe,
};