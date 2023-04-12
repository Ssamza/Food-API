const { Diets } = require("../db");

const findAllDiets = async () => {
  const diets = await Diets.findAll();
  return diets;
};

module.exports = findAllDiets;
