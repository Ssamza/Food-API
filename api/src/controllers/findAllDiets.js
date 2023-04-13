const { API_KEY } = process.env;

const axios = require("axios");
const { Diet } = require("../db");

const findAllDiets = async (req, res) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  ); //estoy solicitando toda la info en esta ruta
  const data = response.data;

  const dietsSet = new Set();

  data.results.forEach((recipe) => {
    recipe.diets.forEach((diet) => {
      dietsSet.add(diet);
    });
  });

  const allDiets = Array.from(dietsSet);

  //DB

  await Diet.bulkCreate(
    allDiets.map((diet) => {
      return { title: diet };
    })
  );
  return allDiets;
};

module.exports = findAllDiets;
