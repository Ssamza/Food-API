import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import style from "./home.module.css";

function Home() {
  return (
    <div className={style.homeContainer}>
      <h2 className={style.homeTitle}>Home page</h2>
      <Navbar />
      <Cards />
    </div>
  );
}

export default Home;
