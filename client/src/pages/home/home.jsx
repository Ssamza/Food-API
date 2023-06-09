import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRecipes,
  getByName,
  getDiets,
  clearRecipes,
} from "../../redux/actions";
import Filters from "./filters";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const navigate = useNavigate();

  const [searchRecipe, setSearchRecipe] = useState("");

  const diets = useSelector((state) => state.diets);

  const [byAz, setByAz] = useState("");
  const [byScore, setByScore] = useState("");

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
    dispatch(getDiets());
    dispatch(getRecipes());
    return () => {
      dispatch(clearRecipes());
    };
  }, [dispatch]);

  const addButton = () => {
    navigate("/form");
  };

  // * Filtro con el back-end
  function handleChange(event) {
    event.preventDefault();
    setSearchRecipe(event.target.value.toLowerCase());
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
      <div className={style.page}>
        {allRecipes.length > 0 ? (
          <>
            <div className={style.title}>
              <h1 className={style.letter}>The RECIPE APP</h1>
            </div>
            <div className={style.addContainer}>
              <button className={style.addButton} onClick={addButton}>
                Add Recipe
              </button>
            </div>
            <div className={style.navContainer}>
              <Navbar
                className={style.nav}
                onChange={handleChange}
                onClick={handleSubmit}
              />
            </div>
            <div className={style.all}>
              <div className={style.pagination}>
                <div className={style.filtersContainer}>
                  <Filters diets={diets} Az={setByAz} Score={setByScore} />
                </div>

                <div className={style.pages}>
                  <button onClick={() => previous()}>{"\u00AB"}</button>
                  {Array.from({ length: totalPages }).map((x, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button onClick={() => next()}>{"\u00BB"}</button>
                </div>
              </div>
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
    </div>
  );
}

export default Home;
