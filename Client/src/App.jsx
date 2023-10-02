import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./App.module.css";
import axios from "axios";
import Form from "./components/Form/Form";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";
import Favorites from "./components/Favorites/Favorites";
import Bonus from "./components/Bonus/Bonus";
import heroSound from "./assets/The Lab.mp3";




function App() {
  let [neonTitleVisible, setNeonTitleVisible] = useState(false); //Esta línea utiliza el hook useState de React para inicializar una variable de estado llamada neonTitleVisible con un valor inicial de false. Además, se crea una función llamada setNeonTitleVisible que se utilizará para actualizar el valor de neonTitleVisible. En resumen, esta línea establece una variable de estado que se utiliza para controlar si un título "neón" debe ser visible o no.
  let [playHeroSound, setPlayHeroSound] = useState(false);

  const activateNeonTitle = () => {//Esto define una función llamada activateNeonTitle. Cuando esta función se llama, hace dos cosas:

    setNeonTitleVisible(true)// Establece el valor de neonTitleVisible en true. Esto indica que el título "neón" debe ser visible.
    setNeonTitleVisible(true);
    setPlayHeroSound(true);
  };

  const location = useLocation();//Nos devuelve un obj y dentro tiene la propiedad pathname que es la que nos interesa
  const navigate = useNavigate(); //Para dirigirnos al habilitarse el acceso

  let [characters, setCharacters] = useState([]); //Almacena los personajes en un array --> array de objs
  let [access, setAccess] = useState(false); //Simulo base de datos
//Funcion login del M2
  //const login = (userData) => {//Si no hago un login cualquier email y contraseña son validos
    //if (userData.password === password && userData.email === email) {//Le doy el acceso solo si los valores que el usuario ingresa son los que yo estableci en las constantes de arriba
     // setAccess(true); //Si coinciden ambas cambio el estado access a true
    //  navigate("/home"); //Me lleva home si tengo acceso
   // }
  //};

  //Funcion login del M3 que conecta el back con el front
  const login = async (userData) => {   
 try {
  const { email, password } = userData;
  const URL = 'http://localhost:3001/rickandmorty/login/';
  const { access } =  (await axios(URL + `?email=${email}&password=${password}`)).data;
  setAccess(access);
  access && navigate ('/home');
} catch(error) {
  console.log(error.message);
}
}

  useEffect(() => { //Se hace para que el usuario no pueda entrar en home si no completa el login, ni siquiera si el usuario pone la ruta en el link
    !access && navigate("/"); //Si access esta en false no me lleva a otra ruta que no sea / y si access esta en true se ejecuta login
  }, [access, navigate]); //array de dependecias, cuando ocurra un cambio en access ejecuta lo que esta dentro de useEffect (el navigate me lo pide vs code)

  const logout = () => { 
    setAccess(false);
    navigate("/form");
  };
//Funcion onsearch realizada en el M2
  // const onSearch = (id) => {
  //   Funcion para cargar mi estado characters con los personajes.Recibo al estado local id (lo que escribe el usuario)
  //   axios(`https://rickandmortyapi.com/api/character/${id}`) //=>Lo que escribe el usuario va a parar a este link para traer al personaje solicitado por el usuario
  //     .then((response) => response.data) //Axios devuelve un obj.Una de esas propiedades es data que tiene otro obj con la respuesta de la Api. Lo que le digo es que de toda la respuesta (response) quedate con la propiedad data
  //     .then((data) => {
  //       if (data.name) {
  //         Aquí se verifica si los datos incluyen una propiedad llamada name. Esto se hace para asegurarse de que se haya encontrado un personaje válido en la respuesta. Si no se encontró un personaje válido, se omite el proceso de agregado.
  //          Verificar si el personaje ya existe en la lista por su ID
  //         const characterExists = characters.some(
    //Esta línea utiliza el método some() en el array characters para verificar si ya existe un personaje con el mismo id que el personaje que se está intentando agregar. some() es un método de array que verifica si al menos un elemento cumple con una condición especificada (en este caso, si existe un personaje con el mismo id).
  //           (char) => char.id === data.id
  //         );

  //         if (!characterExists) {
  //           if (!characterExists) {: Si el personaje no existe en la lista (es decir, characterExists es false), se ejecuta el bloque de código dentro de este if.
  //            Si no existe, agrégalo a la lista
  //           setCharacters((oldChars) => [...oldChars, data]); //Modificamos el estado characters haciendo una copia de todos los personajes que tenia y concatenandole la nueva  respuesta de la Api. oldChars hace referencia a los personajes que ya estaban en el estado
  //         } else {
  //           alert("The character already exists"); //Si el personaje ya existe en la lista, se muestra una alerta indicando que el personaje ya está presente en la lista.
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //        Si ocurre algún error en el proceso, se ejecuta este bloque de código.
  //       console.error("Error:", error);
  //       alert("Ops! The character does not exist"); //Se muestra una alerta en el navegador indicando que el personaje no se pudo encontrar en la API.
  //     });
  // };

//Funcion onsearch del back: cambia la url por nuestro servidor (asi conectamos back y front)
    const onSearch = async (id) => {
      try {
        const characterId= characters.filter(character => character.id === Number(id));
        if (characterId.length) return alert("The character already exists!");
        if (id < 1 || id > 826 ) return alert("Ops! The character does not exist")

        const { data } = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`);
        if (data.name) {
           setCharacters((oldChars) => [...oldChars, data]);
        } else {
           window.alert("Ops! The character does not exist");
        }
     } catch(error) {
        console.log(error.message);
         }
 }


  const onClose = (id) => {
    const charactersFiltered = characters.filter(
      //Hago un filter del estado  para quedarme con todos aquellos personajes cuyo id sea distinto al que recibo por parametro. El filter retorna un nuevo array
      (character) => character.id !== Number(id) //El id que recibo por parametro es un string y el que debo comparar es un numero
    );
    setCharacters(charactersFiltered); //Le pasamos el nuevo array al estado
  }; //En esta funcion recibo el id del personaje que quiero borrar, por ej: 47 en mi estado que tiene a 3 personajes [{5},{2},{47}] ---> De esto hago un filter y comparo si el id de cada posicion es distinto del que me pasan por id o sea 47. Si es distinto lo dejo, si es igual lo elimino (lo saco del array --> retorno un nuevo array sin el id 47)

  const addRandomCharacter = () => {
    const randomId = Math.floor(Math.random() * 826) + 1; //Genero un numero aleatorio valido. Multiplicar el número aleatorio por 826 amplía el rango para que obtengas un número decimal aleatorio entre 0 (inclusive) y 826 (exclusivo). Esto significa que puedes obtener números decimales que incluyen decimales entre 0 y 825.9999, pero no llegarás a 826.
//Math.floor(Math.random() * 826): Aplicar Math.floor() redondea el número decimal hacia abajo para obtener un número entero entre 0 y 825.

//Math.floor(Math.random() * 826) + 1: Finalmente, se agrega 1 para obtener un número entero aleatorio entre 1 y 826. Esto hace que sea válido como un ID de personaje en la API, ya que los IDs de personajes generalmente comienzan desde 1.
    // Llama a la función onSearch con el ID aleatorio
    onSearch(randomId);
  };

  return (
    <div className={style.app}>
      {location.pathname !== "/"  &&( //la prop pathname del obj que devuelve useLocation
        <Nav //Lo dejo fuera de routes para que se muestre en todos lados menos en el login
          onSearch={onSearch}
          logout={logout}
          addRandomCharacter={addRandomCharacter}
        />
      )}
      {location.pathname === "/home" && neonTitleVisible && ( //El h1 solo se muestra en home
        <div className={style.neontitlecontainer}>
          <h1 className={style.neontitle}>Rick and Morty</h1>
          {playHeroSound && <audio autoPlay src={heroSound}></audio>}
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
         <Form login={login} //Le paso la funcion login
          onNeonTitleActivate={activateNeonTitle} />
          }
        ></Route>

        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>       
        <Route path="/bonus" element={<Bonus />}></Route>
      </Routes>
    </div>
  );
}

export default App;
