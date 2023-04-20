import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  getByName,
  getDiets,
  clearRecipes,
} from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const [searchRecipe, setSearchRecipe] = useState("");

  // * Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalPages = Math.ceil(allRecipes.length / pageSize);
  const indexOfLastRecipe = currentPage * pageSize; // = 9
  const indexOfFirstRecipe = indexOfLastRecipe - pageSize; // = 9
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    return () => {
      dispatch(clearRecipes());
    };
  }, [dispatch]);

  // * Filtro con el back-end
  function handleChange(e) {
    e.preventDefault();
    setSearchRecipe(e.target.value.toLowerCase());
  }

  function handleSubmit() {
    dispatch(getByName(searchRecipe));
  }

  const next = () => {
    if (indexOfLastRecipe > allRecipes.length) return;
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
    if (indexOfFirstRecipe < 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={style.homeContainer}>
      {allRecipes.length > 0 ? (
        <>
          <h2 className={style.homeTitle}>Home page</h2>
          <Navbar onChange={handleChange} onClick={handleSubmit} />
          <div className={style.pagination}>
            <button onClick={() => previous()}>{"\u00AB"}</button>
            {Array.from({ length: totalPages }).map((x, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => next()}>{"\u00BB"}</button>
          </div>
          <Cards allRecipes={currentRecipes} />
        </>
      ) : (
        <div className={style.background}>
          <img
            src={require("../../images/egg-beater-loader.gif")}
            alt="buffering"
            className={style.loading}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
