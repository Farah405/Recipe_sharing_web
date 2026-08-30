const express = require("express");
const router = express.Router();

const {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getMyRecipes,
} = require("../controllers/recipe.controller");

const { protect } = require("../middlewares/auth.middleware");

// GET /recipes/mine - requires authentication
router.get("/mine", protect, getMyRecipes);

// Standard CRUD routes
router.get("/", getRecipes);
router.post("/", protect, createRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
