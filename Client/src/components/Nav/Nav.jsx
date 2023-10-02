import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = ({ onSearch, logout, addRandomCharacter }) => {
  return (
    <div>
      <nav className={style.navcontainer}>
      {location.pathname !== "/favorites"  && (<SearchBar onSearch={onSearch}/>)}

      {location.pathname !== "/favorites"  && (  <button className={style.button} onClick={addRandomCharacter}>
          RANDOM
        </button>)}

        <Link to="/home">
          <button className={style.button}>
            <span>HOME</span>
          </button>
        </Link>

        <Link to="/favorites">
          <button className={style.button}>
            <span>FAVORITES</span>
          </button>
        </Link>

       
        <Link to="/bonus">
          <button className={style.button}>
            <span>BONUS TRACK</span>
          </button>
        </Link>

        <Link to="/about">
          <button className={style.button}>
            <span>ABOUT ME</span>
          </button>
        </Link>

        <button onClick={logout} className={style.button}>
          <span>LOG OUT</span>
        </button>
      </nav>
    </div>
  );
};

export default Nav;
