import Card from "../Card/Card";
import { connect, useDispatch } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions";
import { useState, useEffect } from "react";
import style from "./Favorites.module.css";

const Favorites = ({ myFavorites }) => {
  const dispatch = useDispatch();
  let [aux, setAux] = useState(false);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setAux(!aux);
  };

  useEffect(() => () => dispatch(filterCards("allCharacters")), []);

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  return (
    <div>
      <div className={style.filtersContainer}>
        <p className={style.filterText} >FILTERS:</p>

        <select onChange={handleOrder}>
          <option className={style.optionG}  value="A">Ascending</option>
          <option className={style.optionY}value="D">Descending</option>
        </select>

        <select onChange={handleFilter}>
          <option className={style.optionG} value="Male">Male</option>
          <option className={style.optionY} value="Female">Female</option>
          <option className={style.optionB} value="Genderless">Genderless</option>
          <option className={style.optionG} value="unknown">unknown</option>
          <option className={style.optionB}value="allCharacters">All</option>
        </select>
      </div>
<div className={style.favContainer} >
{myFavorites?.map((fav, index) => {
  return (
    <Card
      className={style.favCards}
      key={index}
      id={fav.id}
      name={fav.name}
      species={fav.species}
      gender={fav.gender}
      image={fav.image}
      onClose={fav.onClose}
      showCloseButton={false}
    />
  );
})}

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};
export default connect(mapStateToProps, null)(Favorites);