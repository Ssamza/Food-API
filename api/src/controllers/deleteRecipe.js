const { Recipe } = require("../db");

const deleteRecipe = async (id) => {
  const recipes = await Recipe.findByPk(id);
  if (!recipes) {
    throw Error("ID not found");
  }

  await recipes.destroy();

  const remainingRecipes = await Recipe.findAll({
    attributes: ["id", "title", "image"],
  });

  if (remainingRecipes.length > 0) {
    return {
      message: "Recipe successfully deleted",
      recipes: remainingRecipes,
    };
  } else {
    return { message: "Recipe successfully deleted, no more recipes in DB" };
  }
};

module.exports = deleteRecipe;
