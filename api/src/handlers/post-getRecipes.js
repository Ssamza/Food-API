const getRecipesNameHandler = (req, res) => {
  res.status(200).json({ message: "recipe name received" });
};

const getIdRecipeHandler = (req, res) => {
  res.status(200).json({ message: "IdRecipe received" });
};

const createRecipes = (req, res) => {
  res.status(200).json({ message: "post it" });
};

module.exports = {
  getIdRecipeHandler,
  getRecipesNameHandler,
  createRecipes,
};
