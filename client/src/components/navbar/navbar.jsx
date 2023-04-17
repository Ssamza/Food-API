import style from "./navbar.module.css";

function Navbar() {
  return (
    <div className={style.searchContainer}>
      <input
        className={style.searchInput}
        placeholder="Search recipes"
        type="text"
      />
      <button className={style.searchButton}>Search</button>
    </div>
  );
}

export default Navbar;
