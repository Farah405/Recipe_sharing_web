const Recipe = require("../models/recipe.model");

module.exports = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        msg: "Recipe not found"
      });
    }

    if (recipe.user_id && recipe.user_id.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "You are not authorized to modify this recipe"
      });
    }
    next();
  } catch(err){
    next(err);
  }
};