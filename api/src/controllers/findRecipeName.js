const { Recipe } = require("../db");

const getRecipeName = async () => {
  const recipe = await Recipe.findAll();
  return recipe;
};

module.exports = getRecipeName;
