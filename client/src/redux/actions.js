import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_AZ = "FILTER_BY_AZ";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

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

export function clearRecipes() {
  return { type: CLEAR_RECIPES };
}
export function clearDetail() {
  return { type: CLEAR_DETAIL };
}

// FILTERS

export function byAz(az) {
  return { type: FILTER_BY_AZ, payload: az };
}

export function byScore(score) {
  return { type: FILTER_BY_SCORE, payload: score };
}

export function byDiet(diet) {
  console.log("byDiet action:", diet);
  return { type: FILTER_BY_DIET, payload: diet };
}

export function bySource() {
  return async function (dispatch) {
    const URL = "http://localhost:3001";
    const response = await axios(`${URL}/recipes/all`);
    console.log(response.data);
    return dispatch({ type: FILTER_BY_SOURCE, payload: response.data });
  };
}
