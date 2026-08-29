const express = require("express");

const {
    createRecipe,
    getRecipes,
    updateRecipe,
    deleteRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router();

router.post("/", createRecipe);
router.get("/", getRecipes);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;