import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

const initialState = {
  myFavorites: [],
  allCharactersFav: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: payload, //no le hago spread operator porque como es un solo character, necesito el objeto entero. Tengo que hacer copia del array y no un push para no pisar la info ya que siempre retorno un nuevo obj
        allCharactersFav: payload, //son iguales, solo filtramos y ordenamos los que tenemos en favoritos
      };
   
      
     case REMOVE_FAV:
      return {
         ...state,
          myFavorites: payload, allCharacters: payload 
     };
     case FILTER:
      return {
       ...state,
      myFavorites: state.allCharactersFav.filter((item) => {
       if (payload === "allCharacters") {

         return true;
       } else {
       return item.gender === payload;
         }
       }),
    };


    case ORDER:
      return {
        ...state,
        myFavorites: state.allCharactersFav.sort((a, b) => {
          if (payload === "A") {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        }),
      };
    default:
      return { ...state };
  }
};

export default reducer;