const Recipe = require("../models/recipe.model");

module.exports = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                msg: "User is not authenticated"
            });
        }

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                msg: "Recipe not found"
            });
        }

        if (recipe.user_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                msg: "You are not allowed to modify this recipe"
            });
        }

        next();

    } catch (err) {
        next(err);
    }
};