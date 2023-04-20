import style from "./card.module.css";
import { NavLink } from "react-router-dom";

function Card({ recipe, diets }) {
  const { id, image, title, healthScore } = recipe;

  return (
    <div className={style.container}>
      <div key={id} className={style.cardContainer}>
        <img className={style.img} src={image} alt="recipeImage" />
        <p className={style.caption}>
          <NavLink to={`/detail/${id}`} className={style.nameLink}>
            <h3>{title}</h3>
          </NavLink>
        </p>
        <p className={style.score}>Score: {healthScore}</p>
        <p className={style.diets}>
          Diet: {diets.map((diet) => diet.title).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Card;
