const Recipe = require("../models/recipe.model");

// Create a new recipe
// POST /recipes
const createRecipe = async (req, res, next) => {
    try {
        // Attach the logged-in user's ID as the recipe owner
        const recipe = await Recipe.create({
            ...req.body,
            createdBy: req.user.id,
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe,
        });
    } catch (error) {
        next(error);
    }
};

// Get all recipes
// GET /recipes
const getRecipes = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search && search.trim() !== "") {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { ingredients: { $regex: search, $options: "i" } },
            ];
        }

        if (category && category.trim() !== "") {
            query.category = { $regex: `^${category}$`, $options: "i" };
        }

        // populate() replaces the createdBy ID with the actual user's name and email
        const recipes = await Recipe.find(query).populate("createdBy", "name email");

        res.status(200).json({
            message: "Recipes fetched successfully",
            count: recipes.length,
            recipes,
        });
    } catch (error) {
        next(error);
    }
};

// Get a single recipe by ID
// GET /recipes/:id
const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("createdBy", "name email");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ recipe });
    } catch (error) {
        next(error);
    }
};

// Update a recipe by ID
// PUT /recipes/:id
const updateRecipe = async (req, res, next) => {
    try {
        // new: true returns the updated document instead of the old one
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe,
        });
    } catch (error) {
        next(error);
    }
};

// Delete a recipe by ID
// DELETE /recipes/:id
const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        next(error);
    }
};



// Get all recipes created by the logged-in user
// GET /recipes/mine
// Requires authentication - user must be logged in
const getMyRecipes = async (req, res, next) => {
    try {
        // req.user.id comes from the auth middleware after verifying the token
        const recipes = await Recipe.find({ createdBy: req.user.id }).populate(
            "createdBy",
            "name email"
        );

        res.status(200).json({
            message: "My recipes fetched successfully",
            count: recipes.length,
            recipes,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getMyRecipes,
};
