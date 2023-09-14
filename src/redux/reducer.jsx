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
        myFavorites: [...state.allCharactersFav, payload], //no le hago spread operator porque como es un solo character, necesito el objeto entero. Tengo que hacer copia del array y no un push para no pisar la info ya que siempre retorno un nuevo obj
        allCharactersFav: [...state.allCharactersFav, payload], //son iguales, solo filtramos y ordenamos los que tenemos en favoritos
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: state.myFavorites.filter((fav) => fav.id !== payload), //nos quedamos con el personaje cuyo id sea distinto que el que me mandan por payload. Ese payload viene de la action.
      };
    case FILTER:
      // eslint-disable-next-line no-case-declarations
      const allCharactersFiltered = state.allCharactersFav.filter(
        (character) => character.gender === payload
      ); //Filtramos una copia.Trabajamos sobre el original porque el filter crea un nuevo array

      return {
        ...state,
        myFavorites: payload === 'allCharacters'
        ? [...state.allCharactersFav]
        : allCharactersFiltered,
      };
    case ORDER:
      // eslint-disable-next-line no-case-declarations
      const allCharactersFavCopy = [...state.allCharactersFav]; //Para no modificar el original
      return {
        ...state,
        //porque myFavorites es el estado que usamos para mostrar la informacion en pantalla al otro lo usamos como una copia para ir modificandolo a nuestros gustos
        myFavorites:
          payload === "A"
            ? allCharactersFavCopy.sort((a, b) => a.id - b.id) //a y b representan a dos elementos del array. El id del primero tiene que ser menor al id del segundo. El - funciona igual que <
            : allCharactersFavCopy.sort((a, b) => b.id - a.id),
      };
    default:
      return { ...state };
  }
};

export default reducer;
