import axios from "axios";

const { API_KEY } = process.env;

export const GET_RECIPES = "GET_RECIPES";

export function getRecipes() {
  return async function (dispatch) {
    const response = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    return dispatch({ type: "GET_RECIPES", payload: response.data });
  };
}
