import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState,useEffect } from "react";
import style from "./Card.module.css"



const Card = ({id,name,species,gender,image,onClose,addFav,removeFav,myFavorites, showCloseButton}) => {
   let [isFav, setIsfav] = useState(false);

   const handleFavorite = () =>{
      if(isFav){
         setIsfav(false);
         removeFav(id);
      }
      else{
         setIsfav(true);
         addFav({id,name,species,gender,image,onClose})
      }
   }
   useEffect(() => {      
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsfav(true);
         }
      });
   
   }, [myFavorites, id]);

  return (
    <div>
     
      <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button>
  
      {showCloseButton && <button onClick={() => onClose(id)}>X</button>}

      <Link to={`/detail/${id}`}>
        <h2 className="card-name">{name}</h2>
      </Link>  
      <div className={style.cardcontainer}>
      <h3>{species}</h3>
      <h3>{gender}</h3>
      <img src={image} alt="" />
      </div>   
    </div>
  );
};
const mapStateToProps = (state) =>{
   return {
myFavorites: state.myFavorites,
   }
}

const mapDispatchToProps =(dispatch) =>{
   return{addFav: (character) => {dispatch(addFav(character))},
   removeFav: (id) => { dispatch(removeFav(id))}
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card)
