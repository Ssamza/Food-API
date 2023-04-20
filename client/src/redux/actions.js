import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_DIETS = "GET_DIETS";

export function getRecipes() {
  return async function (dispatch) {
    const URL = "http://localhost:3001";
    const response = await axios(`${URL}/recipes/all`);
    return dispatch({ type: "GET_RECIPES", payload: response.data });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    const URL = "http://localhost:3001";
    const response = await axios(`${URL}/recipes/all?name=${name}`);
    return dispatch({ type: "GET_BY_NAME", payload: response.data });
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    const URL = "http://localhost:3001";
    const response = await axios(`${URL}/recipes/${id}`);
    return dispatch({
      type: GET_RECIPE_DETAIL,
      payload: response.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    const URL = "http://localhost:3001";
    const response = await axios(`${URL}/diets`);
    console.log(response.data);
    return dispatch({ type: GET_DIETS, payload: response.data });
  };
}

export function clearDetail() {
  return { type: CLEAR_DETAIL };
}
