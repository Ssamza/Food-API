const { API_KEY, DB } = process.env;
const { Recipe } = require("../db");
const axios = require("axios");

const getRecipeById = async (id, infoSource) => {
  if (infoSource === "API") {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const { title, image, summary, healthScore, dishTypes } = response.data;
    return { id, title, image, summary, healthScore, dishTypes };
  } else {
    return await Recipe.findByPk(id);
  }
};

module.exports = getRecipeById;
