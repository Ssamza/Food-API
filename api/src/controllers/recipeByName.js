const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe } = require("../db");

const getRecipeName = async () => {
  const recipeFromDB = await Recipe.findAll();
};

module.exports = getRecipeName;
