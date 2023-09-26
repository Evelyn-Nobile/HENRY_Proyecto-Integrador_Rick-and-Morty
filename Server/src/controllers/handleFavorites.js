//simulamos base de datos
let myFavorites = [] //se declara con let porque lo vamos a modificar

const postFav = (req, res) => {
const character = req.body //En este caso no hace falta hacer destructuring.Agrega en tu arreglo de favoritos el personaje que estarás recibiendo por Body.
const characterFound = myFavorites.find(fav => fav.id === character.id)
if(!characterFound) {
    myFavorites.push(character)
//Finalmente devuelve tu arreglo de favoritos en formato JSON.
return res.status(200).json(myFavorites)
}
return res.status(404).send("The character already exists!")
}

const deleteFav = (req, res) => {
    const { id } = req.params;
    const favFiltered = myFavorites.filter((favorite) => favorite.id !== Number(id));
    myFavorites = favFiltered; // Actualiza la variable global con el nuevo array de favoritos
    return res.status(200).json(favFiltered); // Devuelve el nuevo array como respuesta
  }
  

module.exports = {
    postFav,
    deleteFav
};