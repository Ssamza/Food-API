const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const getRecipeByName = async (name) => {
  if (!name) {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    const data = response.data;
    return data.results.map((recipe) => {
      return {
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
      };
    });
  } else {
    const recipeDB = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: { exclude: ["id"] },
    });

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`
      // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    const data = response.data;

    const filterRecipes = data.results
      .filter((recipe) => {
        return recipe.title.toLowerCase().includes(name.toLowerCase());
      })
      .map((recipe) => {
        return {
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
          created: true,
        };
      });

    if (recipeDB.length == 0 && filterRecipes.length == 0) {
      throw Error("Recipe does not exist");
    } else {
      return [...filterRecipes, ...recipeDB];
    }
  }
};

module.exports = getRecipeByName;
