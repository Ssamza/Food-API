import Card from "../card/card";
import style from "./cards.module.css";

function Cards({ allRecipes, diets }) {
  const recipesList = allRecipes;

  return (
    <div className={style.lastElement}>
      <div className={style.container}>
        {recipesList?.map((recipe) => {
          return <Card recipe={recipe} diets={diets} />;
        })}
      </div>
    </div>
  );
}

export default Cards;
