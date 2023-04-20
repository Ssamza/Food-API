import style from "./landing.module.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const exploreButton = () => {
    navigate("/home");
  };

  return (
    <div className={style.image}>
      <div className={style.cover}>
        <div className={style.container}>
          <h1 className={style.text}>The Recipe App</h1>
          <p className={style.paragraph}>
            Welcome to our recipe page, where you can find a wide variety of
            options to prepare at home.
            <br />
            <br />
            Discover delicious recipes, get inspired, and surprise your loved
            ones with unique and flavorful dishes.
          </p>
          <button onClick={exploreButton} className={style.button}>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
