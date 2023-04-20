import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetail, clearDetail } from "../../redux/actions";
import style from "./detail.module.css";

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const recipe = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const backButton = () => {
    navigate("/home");
  };

  return (
    <div>
      {recipe && recipe.title ? (
        <>
          <div>
            <button className={style.backButton} onClick={backButton}>
              Back
            </button>
            <div className={style.imgContainer}>
              <img src={recipe.image} alt="img" className={style.image} />
            </div>
            <div>
              <p>
                <span>DISH:</span> {recipe.title}
              </p>
              <p>
                <span>SCORE:</span> {recipe.healthScore}{" "}
              </p>
              <p>ABOUT:</p>
              <p>{recipe.summary}</p>
              <ol>
                <p>INSTRUCTIONS:</p>
                {recipe.analyzedInstructions.map((instruction) => (
                  <li key={instruction.number}>{instruction.step}</li>
                ))}
              </ol>
            </div>
          </div>
        </>
      ) : (
        <div className={style.loadingScreen}>
          <h2>Recipe is loading...</h2>
        </div>
      )}
    </div>
  );
}

export default Detail;
