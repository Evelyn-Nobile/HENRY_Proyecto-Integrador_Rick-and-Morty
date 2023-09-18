import { useState } from "react";
import style from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  let [id, setId] = useState("");

  const handleChange = (event) => { //cada vez que el usuario escribe algo en el input, se guarda en el estado local ID
    setId(event.target.value); //obtengo el valor de lo que el usuario escribe en el input y lo guardo en el estado Id
    //objeto event --> propiedad target y su valor es input. La propiedad target tiene a su vez una propiedad value y su valor es lo que el usuario escribe en el input
  };

  return (
    <div className={style.container}>
      {" "}
      <FontAwesomeIcon icon={faBars} className={style.icon} />
      <input
        className={style.search}
        type="search"
        value={id} //Este value es igual al que agarramos del obj event. Aca lo que hacemos es igualar el value a lo que tenga el estado id. Mi estado local tiene que ser igual a lo que escriba el usuario. Esto es para mostrar exactamente al personaje que solicite el usuario
        onChange={handleChange} //Le pedimos que se quede atento a los cambios y que cuando haya uno ejecute la funcion handleChange 
      />
      <button
        onClick={() => { //Esto lo hacemos cuando tenemos que pasarle un argumento a una funcion. Lo hacemos con callback. ()=> se ejecuta cuando se hace click y esta arrow ejecuta luego onSearch con el argumento id (estado)
          onSearch(id);
          setId(""); //Para limpiar el input luego de buscar el personaje
        }}
        className={style.button}
      >
        ADD
      </button>
      {/* La funcion onsearch esta esperando un parametro (id) */}
    </div>
  );
};

export default SearchBar;
