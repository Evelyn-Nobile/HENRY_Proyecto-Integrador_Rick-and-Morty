import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import style from "./Detail.module.css"

const Detail = () => {
  //Trabajo con ids porque los nombres por ejemplo se pueden repetir
  const { id } = useParams(); //Obtengo el id de la ruta:<Route path="/detail/:id" element={<Detail />}></Route> Card --> <Link to={`/detail/${id}`}  className={style.link}> . Destructuring porque useParams devuelve obj con la propiedad id
  let [character, setCharacter] = useState({});
 
//Creada en el M2
  // useEffect(() => {
  //   este código es el que buscará al personaje de la API cada vez que el componente se monte. Y luego, cada vez que se desmonte, borrará su información.
  //   axios(`https://rickandmortyapi.com/api/character/${id}`).then( //Id de useParams
  //     ({ data }) => {
  //       if (data.name) {
  //         setCharacter(data); //Guardo la respuesta de la api en el estado character
  //       } else {
  //         alert("The character doesn't exist");
  //       }
  //     }
  //   );
  //   return setCharacter({}); //Cuando se desmonta el componente vacia el estado osea lo remplazo por un objeto vacio. 
  // }, [id]); //Si no pongo el array de dependecias se hacen peticiones infinitas a la Api. Id de useParams . El array de dependecias corresponde al ciclo de vida de la actualizacion. Cuando cambia el id se ejecuta el useEffect
//El array de dependencias en React es una lista de variables o valores que el hook useEffect utiliza para saber cuándo debe ejecutar su código interno. Si alguno de los valores dentro de ese array cambia, el useEffect se activa y ejecuta su contenido. Si ninguno de los valores cambia, el useEffect no hace nada.
//En otras palabras, el array de dependencias te permite decirle a React qué variables o valores debe observar el useEffect para determinar cuándo debe realizar alguna acción. Cuando alguna de esas variables cambia, el useEffect se ejecuta, lo que es útil para realizar tareas como hacer solicitudes a una API cuando ciertos datos cambian o limpiar recursos cuando un componente se desmonta.

//M3: Cambiamos la url por nuestro servidor
useEffect(() => {  
  axios(`http://localhost:3001/rickandmorty/character/${id}`).then( 
    ({ data }) => {
      if (data.name) {
        setCharacter(data); 
      } else {
        alert("The character doesn't exist");
      }
    }
  );
  return setCharacter({}); 
}, [id]);

return (
    <div className={style.card}>
      {character && ( //Me tengo que fijar que el objeto character no este vacio. Si no lo está renderiza las etiquetas. Se usan {} para el renderizado condicional. NO SE PUEDE USAR IF. Puedo usar ternario,? (condicional chaining) o &&
        //El renderizado de abajo es mas rapido que la peticion a la api por eso hay que chequear que haya algo en el estado primero
        <div > 

        
      
<div className={style.containerName} >
          <h2 className={style.name}>{character.name}</h2>
          </div>
          <div className={style.content} > 
          <h3 className={style.status}  >Status: {character.status}</h3>
          <h3 className={style.specie} >Specie: {character.species}</h3>
          <h3 className={style.gender} >Gender: {character.gender}</h3>
          <h3 className={style.origin}  >Origin: {character.origin && character.origin.name}</h3>
          </div>

          <div className={style.image}>
          <img src={character.image} alt={character.name} />
          <Link to="/home"> <button className={style.btn}>HOME</button></Link>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
