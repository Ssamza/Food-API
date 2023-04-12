const { Router } = require("express");
const {
  getIdRecipeHandler,
  getRecipesNameHandler,
  postRecipes,
} = require("../handlers/post-getRecipes");

const recipesRouter = Router();

recipesRouter.get("/name", getRecipesNameHandler);

recipesRouter.get("/:id", getIdRecipeHandler);

recipesRouter.post("/", postRecipes);

//POST

module.exports = recipesRouter;
