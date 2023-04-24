const { Router } = require("express");
const {
  getIdRecipeHandler,
  getRecipesHandler,
  postRecipes,
  deleteRecipeHandler,
} = require("../handlers/post-getRecipes");

const recipesRouter = Router();

recipesRouter.get("/all", getRecipesHandler);

recipesRouter.get("/:id", getIdRecipeHandler);

recipesRouter.post("/", postRecipes);

recipesRouter.delete("/:id", deleteRecipeHandler);

//POST

module.exports = recipesRouter;
