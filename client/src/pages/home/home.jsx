import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const allRecipesCopy = useSelector((state) => state.allRecipesCopy);
  //se usa la copia para hacer el filtrado y no modificar el estado original encargado de traer todas las recipes
  const [filter, setFilter] = useState(allRecipesCopy.results);
  const [searchRecipe, setSearchRecipe] = useState("");
  // const [full, setFull] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setSearchRecipe(e.target.value.toLowerCase());
    // if (e.target.value === "") setFull(false);
  }

  function handleSubmit() {
    const filter = allRecipesCopy.results.filter((recipe) => {
      return recipe.title.toLowerCase().includes(searchRecipe);
    });
    setFilter(filter);
    // setFull(true);
  }

  //para ejectura nuestra action en el momento del mount(cuando la página se renderiza por 1ra vez )
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className={style.homeContainer}>
      <h2 className={style.homeTitle}>Home page</h2>
      <Navbar onChange={handleChange} onClick={handleSubmit} />
      <Cards allRecipes={filter || allRecipes.results} />
    </div>
  );
}

export default Home;
