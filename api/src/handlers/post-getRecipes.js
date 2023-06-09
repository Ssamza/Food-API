const createRecipe = require("../controllers/createRecipe");
const getRecipeById = require("../controllers/recipeById");
const getAll = require("../controllers/recipeAll&Name");
const deleteRecipe = require("../controllers/deleteRecipe");

//query?
const getRecipesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const all = await getAll();
    if (name) {
      let recipeName = all.filter((recipe) =>
        recipe.title.toLowerCase().includes(name.toLowerCase())
      );
      if (recipeName.length === 0) {
        throw new Error("Recipe not available");
      }
      res.status(200).json(recipeName);
    } else {
      res.status(200).json(all);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//:id => params
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
    const {
      title,
      image,
      summary,
      healthScore,
      analyzedInstructions,
      diets,
      created,
    } = req.body;
    const newRecipe = await createRecipe({
      title,
      image,
      summary,
      healthScore,
      analyzedInstructions,
      diets,
      created,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRecipeHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const erased = await deleteRecipe(id);
    res.status(200).json(erased);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdRecipeHandler,
  getRecipesHandler,
  postRecipes,
  deleteRecipeHandler,
};
