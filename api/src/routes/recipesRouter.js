const { Router } = require("express");
const {
  getIdRecipeHandler,
  getRecipesNameHandler,
  postRecipes,
  deleteRecipeHandler,
} = require("../handlers/post-getRecipes");

const recipesRouter = Router();

recipesRouter.get("/name", getRecipesNameHandler);

recipesRouter.get("/:id", getIdRecipeHandler);

recipesRouter.post("/", postRecipes);

recipesRouter.delete("/:id", deleteRecipeHandler);

//POST

module.exports = recipesRouter;
