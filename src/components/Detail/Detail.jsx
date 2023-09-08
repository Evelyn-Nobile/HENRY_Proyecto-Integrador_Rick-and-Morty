import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  let [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);
  return (
    <div>
      {character && (
        <div>
          <h2>{character.name}</h2>
          <h3>Status: {character.status}</h3>
          <h3>Specie: {character.species}</h3>
          <h3>Gender: {character.gender}</h3>
          <h3>Origin: {character.origin && character.origin.name}</h3>
          <img src={character.image} alt={character.name} />
        </div>
      )}
    </div>
  );
};

export default Detail;
