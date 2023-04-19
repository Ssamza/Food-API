import Card from "../card/card";
import style from "./cards.module.css";

function Cards({ allRecipes }) {
  const recipesList = allRecipes;

  return (
    <div className={style.lastElement}>
      {/* <h1>prueba</h1> */}
      <div className={style.container}>
        {recipesList?.map((recipe) => {
          return <Card recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default Cards;
