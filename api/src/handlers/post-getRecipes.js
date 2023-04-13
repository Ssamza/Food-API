const createRecipe = require("../controllers/createRecipe");
const getRecipeById = require("../controllers/recipeById");

//query?
const getRecipesNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await getRecipeByName(name);
    res.status(200).json(response);
  } catch (error) {}
  res.status(400).json({ error: error.message });
};

//:idRecipe => params
const getIdRecipeHandler = async (req, res) => {
  const { id } = req.params;
  //validar si es un numero
  const infoSource = isNaN(id) ? "DB" : "API";

  try {
    const response = await getRecipeById(id, infoSource);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//post
const postRecipes = async (req, res) => {
  try {
    const { title, image, summary, healthScore, dishTypes, diet } = req.body;
    const newRecipe = await createRecipe({
      title,
      image,
      summary,
      healthScore,
      dishTypes,
      diet,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdRecipeHandler,
  getRecipesNameHandler,
  postRecipes,
};
