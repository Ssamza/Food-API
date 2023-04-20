import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getByName, getDiets } from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const diets = useSelector((state) => state.diets);
  const [searchRecipe, setSearchRecipe] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchRecipe(e.target.value.toLowerCase());
  }

  // * Filtro con el back-end

  function handleSubmit() {
    dispatch(getByName(searchRecipe));
  }

  // * Filtro sobre el estado
  // const allRecipesCopy = useSelector((state) => state.allRecipesCopy);
  //se usa la copia para hacer el filtrado y no modificar el estado original encargado de traer todas las recipes

  // const [filter, setFilter] = useState(allRecipesCopy);
  // const [searchRecipe, setSearchRecipe] = useState("");

  // function handleChange(e) {
  //   e.preventDefault();
  //   setSearchRecipe(e.target.value.toLowerCase());
  // }

  // function handleSubmit() {
  //   const filter = allRecipesCopy.filter((recipe) => {
  //     return recipe.title.toLowerCase().includes(searchRecipe);
  //   });
  //   setFilter(filter);
  // }

  //para ejectura nuestra action en el momento del mount(cuando la página se renderiza por 1ra vez )
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.homeContainer}>
      <h2 className={style.homeTitle}>Home page</h2>
      <Navbar onChange={handleChange} onClick={handleSubmit} />
      <Cards allRecipes={allRecipes} diets={diets} />
    </div>
  );
}

export default Home;
