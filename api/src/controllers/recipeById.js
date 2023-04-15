const { API_KEY, DB } = process.env;
const { Recipe } = require("../db");
const axios = require("axios");

const getRecipeById = async (id, infoSource) => {
  if (infoSource === "API") {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const { title, image, summary, healthScore, analyzedInstructions } =
      response.data;
    const justInstructions = analyzedInstructions
      .map((instruction) =>
        instruction.steps.map((ele) => ({
          number: ele.number,
          step: ele.step,
        }))
      )
      .flat();
    return {
      id,
      title,
      image,
      summary,
      healthScore,
      analyzedInstructions: justInstructions,
    };
  } else {
    return await Recipe.findByPk(id);
  }
};

module.exports = getRecipeById;
