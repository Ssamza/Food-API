import {
  GET_RECIPES,
  GET_BY_NAME,
  GET_RECIPE_DETAIL,
  CLEAR_RECIPES,
  CLEAR_DETAIL,
  GET_DIETS,
} from "./actions";

let initialState = {
  allRecipes: [],
  allRecipesCopy: [],
  recipeDetail: {},
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        allRecipesCopy: action.payload,
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
    default:
      return state;
  }
}

export default rootReducer;
