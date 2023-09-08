import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form/Form";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";

const email = "nobileevelyn1@gmail.com";
const password = "valentino5";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  let [characters, setCharacters] = useState([]);
  let [access, setAccess] = useState(false);

  const login = (userData) => {
    if (userData.password === password && userData.email === email) {
      setAccess(true);
      navigate("/home");
    }
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  const logout = () => {
    setAccess(false);
    navigate("/form")
  };

  const onSearch = (id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          alert("Ops! The ID doesn's exist");
        }
      });
  };

  const onClose = (id) => {
    const charactersFiltered = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(charactersFiltered);
  };

 

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} logout={logout} />}
      
      <Routes>
        <Route path="/" element={<Form login={login} />}></Route>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>       
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
