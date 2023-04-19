import {
  GET_RECIPES,
  CLEAR_DETAIL,
  GET_RECIPE_DETAIL,
  GET_DIETS,
} from "./actions";

let initialState = {
  allRecipes: [],
  allRecipesCopy: [],
  recipeDetail: [],
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
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
