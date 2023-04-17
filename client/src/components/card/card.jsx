import style from "./card.module.css";

function Card({ id, image, title, summary, heatlhScore }) {
  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        <img className={style.img} src={image} alt="recipeImage" />
        <span className={style.title}>Name: {title}</span>
        <span className={style.summary}>Description: {summary}</span>
        <span className={style.score}>Score: {heatlhScore}</span>
      </div>
    </div>
  );
}

export default Card;
