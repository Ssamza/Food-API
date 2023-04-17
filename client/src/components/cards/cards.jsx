import Card from "../card/card";
import style from "./cards.module.css";

function Cards() {
  return (
    <div className={style.container}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default Cards;
