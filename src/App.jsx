import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form/Form";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";

const email = "nobileevelyn1@gmail.com";
const password = "123asd";

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
    navigate("/form");
  };

  const onSearch = (id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.name) {
          // Verificar si el personaje ya existe en la lista por su ID
          const characterExists = characters.some((char) => char.id === data.id);
          
          if (!characterExists) {
            // Si no existe, agrégalo a la lista
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            alert("The character already exists");
          }
        } 
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ops! The character does not exist");
      });
  };

  const onClose = (id) => {
    const charactersFiltered = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(charactersFiltered);
  };

  const addRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 672) + 1; // ID aleatorio válido

    // Llama a la función onSearch con el ID aleatorio
    onSearch(randomId);
  };
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav
          onSearch={onSearch}
          logout={logout}
          addRandomCharacter={addRandomCharacter}
        />
      )}

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
