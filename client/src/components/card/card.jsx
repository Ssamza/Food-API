import style from "./card.module.css";

function Card({ recipe }) {
  const { id, image, title, healthScore } = recipe;

  return (
    <div className={style.container}>
      <div key={id} className={style.cardContainer}>
        <img className={style.img} src={image} alt="recipeImage" />
        <span className={style.title}>Dish: {title}</span>
        <span className={style.score}>Score: {healthScore}</span>
      </div>
    </div>
  );
}

export default Card;
