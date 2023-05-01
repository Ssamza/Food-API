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
          <div className={style.backContainer}>
            <button className={style.backButton} onClick={backButton}>
              Back
            </button>
          </div>
          <div className={style.all}>
            <div className={style.imgContainer}>
              <img src={recipe.image} alt="img" className={style.image} />
              <div className={style.caption}>
                <p>
                  <span className={style.dish}>DISH:</span> {recipe.title}
                </p>
                <p>
                  <span className={style.score}>SCORE:</span>{" "}
                  {recipe.healthScore}{" "}
                </p>
              </div>
            </div>
            <div className={style.text}>
              <span className={style.about}>ABOUT:</span>
              <p>{recipe.summary}</p>
              <br />
              <br />
              <ol>
                <span className={style.instructions}>INSTRUCTIONS:</span>
                <br />
                <br />

                {recipe.analyzedInstructions.map((instruction) => (
                  <li key={instruction.number}>{instruction.step}</li>
                ))}
              </ol>
            </div>
          </div>
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

export default Detail;
