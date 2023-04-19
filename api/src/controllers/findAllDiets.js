const { API_KEY } = process.env;

const axios = require("axios");
const { Diet } = require("../db");

const findAllDiets = async () => {
  const diets = await Diet.findAll();

  let data;
  if (diets.length > 0) {
    return diets;
  } else {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );
    data = response.data;
  } //estoy solicitando toda la info en esta ruta

  // return data;

  const dietsSet = new Set();
  const property = "vegetarian";

  data.results.forEach((recipe) => {
    if (recipe[property] === true) dietsSet.add(property);
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
