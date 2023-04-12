const createRecipe = require("../controllers/createRecipe");
const getRecipeById = require("../controllers/getRecipeById");

//query
const getRecipesNameHandler = (req, res) => {
  const { name } = req.query;

  if (name) {
    const nameLowerCase = name.toLowerCase();
    res
      .status(200)
      .json({ message: `here is the recipe received: ${nameLowerCase}` });
  } else {
    res.status(400).json({ error: "the recipe does not exist" });
  }
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
