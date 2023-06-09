const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const createRecipe = async ({
  title,
  image,
  summary,
  healthScore,
  analyzedInstructions,
  diets,
  created,
}) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    analyzedInstructions,
    created: true,
  });

  let foundDiets = [];

  if (diets.length > 0) {
    for (const name of diets) {
      const diet = await Diet.findOne({
        where: {
          title: name,
        },
      });
      if (!diet) {
        throw new Error(`Diet '${name}' is not valid`);
      }
      await newRecipe.addDiet(diet);
      foundDiets.push(diet);
    }
  } else {
    throw new Error("No diet found");
  }

  const recipeWithDiets = {
    diets: foundDiets.map((diet) => diet.title),
  };

  return { ...newRecipe.toJSON(), ...recipeWithDiets };
};

module.exports = createRecipe;
