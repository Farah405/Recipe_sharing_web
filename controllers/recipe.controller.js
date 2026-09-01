const Recipe = require("../models/recipe.model");


// CREATE
exports.createRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.create({
            ...req.body,
            user_id: req.user.id
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe
        });

    } catch (err) {
        next(err);
    }
};


// GET ALL WITH SEARCH + FILTER
exports.getAllRecipes = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        const query = {};

        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { ingredients: { $elemMatch: { $regex: search, $options: "i" } } }
            ];
        }

        const recipes = await Recipe.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            recipes
        });

    } catch (err) {
        next(err);
    }
};


// GET MY RECIPES
exports.getMyRecipes = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        const query = { user_id: req.user.id };

        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { ingredients: { $elemMatch: { $regex: search, $options: "i" } } }
            ];
        }

        const recipes = await Recipe.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            recipes
        });

    } catch (err) {
        next(err);
    }
};


// GET BY ID
exports.getRecipeById = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                msg: "Recipe not found"
            });
        }

        res.status(200).json({
            recipe
        });

    } catch (err) {
        next(err);
    }
};


// UPDATE
exports.updateRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!recipe) {
            return res.status(404).json({
                msg: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe
        });

    } catch (err) {
        next(err);
    }
};


// DELETE
exports.deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(
            req.params.id
        );

        if (!recipe) {
            return res.status(404).json({
                msg: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};