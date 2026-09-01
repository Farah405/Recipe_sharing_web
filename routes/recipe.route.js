const express = require("express");

const {
    createRecipe,
    getAllRecipes,
    getMyRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
} = require("../controllers/recipe.controller");

const { validateToken } = require("../middlewares/auth.middleware");

const ownershipMiddleware = require("../middlewares/ownership.middleware");

const router = express.Router();


// Create
router.post(
    "/",
    validateToken,
    createRecipe
);


// Read All with search and filter
router.get(
    "/",
    getAllRecipes
);


// My Recipes
router.get(
    "/mine",
    validateToken,
    getMyRecipes
);


// Read One
router.get(
    "/:id",
    getRecipeById
);


// Update
router.put(
    "/:id",
    validateToken,
    ownershipMiddleware,
    updateRecipe
);


// Delete
router.delete(
    "/:id",
    validateToken,
    ownershipMiddleware,
    deleteRecipe
);


module.exports = router;