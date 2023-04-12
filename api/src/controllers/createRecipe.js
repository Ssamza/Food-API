const { Recipe, Diet } = require("../db");

const createRecipe = async ({
  title,
  image,
  summary,
  healthScore,
  dishTypes,
  diet,
}) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    dishTypes,
  });

  newRecipe.addDiets(diet);

  return newRecipe;
};

module.exports = createRecipe;
