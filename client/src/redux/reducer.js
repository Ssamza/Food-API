import { all } from "axios";
import {
  ADD_RECIPE,
  GET_RECIPES,
  GET_BY_NAME,
  GET_RECIPE_DETAIL,
  CLEAR_RECIPES,
  CLEAR_DETAIL,
  GET_DIETS,
  FILTER_BY_AZ,
  FILTER_BY_SOURCE,
  FILTER_BY_DIET,
  FILTER_BY_SCORE,
} from "./actions";

let initialState = {
  allRecipes: [],
  allRecipesCopy: [],
  recipeDetail: {},
  diets: [],
  newRecipe: {},
};

function rootReducer(state = initialState, action) {
  const { allRecipes } = state;
  const { allRecipesCopy } = state;
  const { diets } = state;

  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        allRecipesCopy: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case CLEAR_RECIPES:
      return {
        ...state,
        allRecipes: [],
        allRecipesCopy: [],
      };
    case GET_BY_NAME:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };
    case FILTER_BY_AZ:
      let orderRecipes = [];
      if (action.payload === "top-down") {
        orderRecipes = [...allRecipes].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (action.payload === "bottom-up") {
        orderRecipes = [...allRecipes].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
      return {
        ...state,
        allRecipes: orderRecipes,
      };
    case FILTER_BY_SCORE:
      let scoreRecipes = [];
      if (action.payload === "low") {
        scoreRecipes = [...allRecipes].sort(
          (a, b) => a.healthScore - b.healthScore
        );
      } else if (action.payload === "high") {
        scoreRecipes = [...allRecipes].sort(
          (a, b) => b.healthScore - a.healthScore
        );
      }
      return {
        ...state,
        allRecipes: scoreRecipes,
      };
    case FILTER_BY_DIET:
      console.log("All Recipes Copy before filtering:", allRecipes);
      let recipesByDiet;
      if (action.payload === "allDiets") {
        recipesByDiet = [...allRecipesCopy];
      } else {
        recipesByDiet = [...allRecipesCopy].filter((recipe) =>
          recipe.diets.some((diet) => diet === action.payload)
        );
      }
      console.log("After filtering:", recipesByDiet);
      return {
        ...state,
        allRecipes: recipesByDiet,
      };
    case FILTER_BY_SOURCE:
      // console.log("All Recipes Copy before filtering:", allRecipes);
      if (action.payload === "API") {
        const recipesAPI = allRecipesCopy.filter(
          (recipe) => recipe.created === false
        );
        // console.log("After filtering:", recipesAPI);

        return { ...state, allRecipes: recipesAPI };
      } else if (action.payload === "DB") {
        const recipesDB = allRecipesCopy.filter(
          (recipe) => recipe.created === true
        );
        if (recipesDB.length === 0) {
          window.alert("No recipes added");
        } else {
          return {
            ...state,
            allRecipes: recipesDB,
          };
        }
        // console.log("After filtering:", recipesDB);
      } else {
        return {
          ...state,
          allRecipes: allRecipesCopy,
        };
      }
    case ADD_RECIPE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
