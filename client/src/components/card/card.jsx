import style from "./card.module.css";
import { NavLink } from "react-router-dom";

function Card({ recipe }) {
  const { id, image, title, healthScore, diets } = recipe;

  return (
    <div className={style.container}>
      <div key={id} className={style.cardContainer}>
        <div className={style.imageContainer}>
          <img className={style.img} src={image} alt="recipeImage" />
        </div>
        <div className={style.textContainer}>
          <p className={style.caption}>
            <NavLink to={`/detail/${id}`} className={style.nameLink}>
              <h3>{title}</h3>
            </NavLink>
          </p>
          <div className={style.props}>
            <hr />
            <p className={style.score}>
              {" "}
              <span className={style.span}> Score:</span> {healthScore}
            </p>
            <p className={style.diets}>
              <hr />
              <span className={style.span}> Diet: </span>
              {diets?.map((diet, index) => {
                if (index === diets.length - 1) {
                  return diet + ".";
                } else {
                  return diet + ", ";
                }
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
