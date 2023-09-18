import Card from "../Card/Card";
import style from "./Cards.module.css"

const Cards = ({ characters, onClose }) => {
  return (
    <div className={style.container}>
      {characters.map( //transformo el array characters a elementos html
        ({ id, name, status, species, gender, origin, image }) => (
          <Card //por cada personaje del array, renderizo un componente card
            key={id}
            id={id}
            name={name}
            status={status}
            species={species}
            gender={gender}
            origin={origin.name}
            image={image}
            onClose={onClose}//Lo recibo de app
            showCloseButton={true}
          />
        )
      )}
    </div>
  );
};

export default Cards;
