import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

const Card = ({
  id,
  name,
  species,
  gender,
  image,
  onClose,
  addFav,
  removeFav,
  myFavorites,
  showCloseButton,
}) => {
  let [isFav, setIsfav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsfav(false);
      removeFav(id);
    } else {
      setIsfav(true);
      addFav({ id, name, species, gender, image, onClose });
    }
  };
  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsfav(true);
      }
    });
  }, [myFavorites, id]);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.image}>
          <img src={image} alt="" />
        </div>

        <div className={style.details}>
          <div className={style.center}>
             <Link to={`/detail/${id}`}  className={style.link}>
             {/* Le concateno el id del personaje que renderizamos  */}
              <h2 className={style.cardname}>{name}</h2>
            </Link>
            <h3 className={style.specie}>{species}</h3>
            <h3 className={style.gender}>{gender}</h3>

            <ul>
              <li>
                <button className={style.heart} onClick={handleFavorite}>
                  {isFav ? "💚" : "🤍"}
                </button>
              </li>
              <li>
                {showCloseButton && (
                  <button className={style.close} onClick={() => onClose(id)}>❌</button> //Lo recibo de cards que previamente lo habia recibido por app. Le paso el id que recibo por props
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },
    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
