import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";


const Nav = ({ onSearch, logout,addRandomCharacter }) => {
 

  
  
  return (
    <nav>
      <SearchBar onSearch={onSearch} />
     <button onClick={addRandomCharacter} >RANDOM</button>

      <button>
        <Link to="home">HOME</Link>
      </button>

      <button>
        <Link to="About">ABOUT</Link>
      </button>

    <button onClick={logout} >LOG OUT</button>
    </nav>
  );
};

export default Nav;
