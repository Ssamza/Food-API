const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

const getFromApi = async () => {
  const recipesAPI = [];
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const data = response.data;
  data.results.map((recipe) => {
    recipesAPI.push({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary.replace(/<[^>]*>/g, ""),
      diets: recipe.diets,
      healthScore: recipe.healthScore,
      analyzedInstructions: recipe.analyzedInstructions
        .map((instruction) =>
          instruction.steps.map((ele) => ({
            number: ele.number,
            step: ele.step,
          }))
        )
        .flat(),
      created: false,
    });
  });
  return recipesAPI;
};

const getFromDB = async () => {
  const recipesDB = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });

  const allRecipesDB = recipesDB.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary.replace(/<[^>]*>/g, ""),
      diets: recipe.diets,
      healthScore: recipe.healthScore,
      analyzedInstructions: recipe.analyzedInstructions,
      created: recipe.created,
    };
  });
  return allRecipesDB;
};

const getAll = async () => {
  const [apiRecipes, dbRecipes] = await Promise.all([
    getFromApi(),
    getFromDB(),
  ]);
  const allRecipes = [...apiRecipes, ...dbRecipes];
  if (allRecipes.length === 0) {
    throw new Error("Info not available");
  } else {
    return allRecipes;
  }
};

module.exports = getAll;
