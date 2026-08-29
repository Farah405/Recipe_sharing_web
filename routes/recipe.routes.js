const express = require("express");

const {
    createRecipe,
    getRecipes,
    updateRecipe,
    deleteRecipe,
} = require("../controllers/recipe.controller");

const {validateToken}= require("../middlewares/auth.middleware");
const OwnershipMiddleware = require("../middlewares/Ownership.middleware");

const router = express.Router();

router.post("/",validateToken ,createRecipe);
router.get("/", getRecipes);
router.put("/:id",validateToken,OwnershipMiddleware,updateRecipe);
router.delete("/:id",validateToken, OwnershipMiddleware ,deleteRecipe);

module.exports = router;