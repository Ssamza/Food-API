const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const getRecipeByName = async (name) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`
  );
  const data = response.data;
  // return data;

  const recipeDB = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
    attributes: { exclude: ["id"] },
  });

  const filterRecipes = data.results
    .filter((recipe) => {
      return recipe.title.toLowerCase().includes(name.toLowerCase());
    })
    .map((recipe) => {
      return {
        title: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        analyzedInstructions: recipe.analyzedInstructions
          .map((instruction) =>
            instruction.steps.map((ele) => ({
              number: ele.number,
              step: ele.step,
            }))
          )
          .flat(),
      };
    });

  if (recipeDB.length == 0 && filterRecipes.length == 0) {
    throw Error("Recipe does not exist");
  } else {
    return [...filterRecipes, ...recipeDB];
  }
};

module.exports = getRecipeByName;
