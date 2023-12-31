const express = require('express');
const router = express.Router();

const {getCharById} = require('../controllers/getCharById.js')
const login = require('../controllers/login.js');
const postUser = require('../controllers/postUser.js');
const postFav = require('../controllers/postFav.js');
const deleteFav = require('../controllers/deleteFav.js');

//crear y modularizar rutas
//Crea una ruta para cada controlador con los siguientes paths:

//GET getCharById: "/character/:id"
//GET login: "/login"
//POST postFav: "/fav"
//DELETE deleteFav: "/fav/:id"
//Finalmente exporta tu router.
//Los use van en el archivo index de utils

router.get('/character/:id', (req, res) =>{
getCharById(req,res) //Cuando haga una peticion a la ruta se va a ejecutar el controlador. El req y res que espera el controlador 
})                   //Si no le pongo la funcion la ruta no hace nada

router.get("/login", login);

router.post('/login', postUser);

router.post('/fav', postFav);

router.delete('/fav/:id', deleteFav);



module.exports = router;
