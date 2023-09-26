const express = require("express");
const server = express();
const PORT = 3001;
const router = require('./routes/index')

//middlewares:

//Crea un middleware que ejecute a `express.json()`
server.use(express.json());//Pasa la info que me llega en json a js



server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });

//Crea un middleware que agregue el string "`/rickandmorty`" antes de cada una de tus rutas.
server.use('/rickandmorty', router)
server.listen(PORT, () => {
   console.log(`Server raised in port: ${PORT}` );
})