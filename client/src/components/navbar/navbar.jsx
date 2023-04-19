import style from "./navbar.module.css";

function Navbar({ onChange, onClick }) {
  return (
    <div className={style.searchContainer}>
      <input
        className={style.searchInput}
        placeholder="Search recipes"
        type="search"
        onChange={onChange}
      />
      <button type="submit" onClick={onClick} className={style.searchButton}>
        Search
      </button>
    </div>
  );
}

export default Navbar;
