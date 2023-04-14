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
    where: { title: name },
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
      };
    });

  if (recipeDB.length == 0 && filterRecipes.length == 0) {
    throw Error("Match not found");
  } else {
    return [...filterRecipes, ...recipeDB];
  }
};

module.exports = getRecipeByName;
