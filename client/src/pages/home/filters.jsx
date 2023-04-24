import { useDispatch } from "react-redux";
import { byAz, byScore, byDiet, bySource } from "../../redux/actions";
import style from "./filters.module.css";

function Filters({ diets, Az, Score }) {
  const dispatch = useDispatch();

  function handlerByAz(event) {
    dispatch(byAz(event.target.value));
    Az(event.target.value);
  }

  function handlerByScore(event) {
    dispatch(byScore(event.target.value));
    Score(event.target.value);
  }

  function handlerByDiets(event) {
    dispatch(byDiet(event.target.value));
  }

  function handlerBySource(event) {
    dispatch(bySource(event.target.value));
  }

  //   function handleReset(e) {
  //     window.location.reload(false);
  //   }

  return (
    <div className={style.container}>
      <select name="byAz" onChange={handlerByAz}>
        <option value="top-down">A-z</option>
        <option value="bottom-up">Z-a</option>
      </select>
      <select name="byScore" onChange={handlerByScore}>
        <option value="low">LowScore</option>
        <option value="high">HighScore</option>
      </select>
      <select name="diets" onChange={handlerByDiets}>
        <option value="select" disabled>
          Select diet
        </option>
        <option value="allDiets" defaultValue>
          All
        </option>
        {diets?.map((diet) => (
          <option key={diet.id} value={diet.title}>
            {diet.title}
          </option>
        ))}
      </select>
      <select name="bySource" onChange={handlerBySource}>
        <option value="allData">All Recipes</option>
        <option value="API">Online Data</option>
        <option value="DB">Recipes Added</option>
      </select>
    </div>
  );
}

export default Filters;
