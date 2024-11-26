
import express from 'express';
import { config } from 'dotenv';
import { FormatIP } from './middlewares/formatIP';
import { DBConnection } from './database/config';
config();

// Creamos una app de express
const app = express();

// Inicializar BD
DBConnection();

// Permitimos peticiones de cualquier sitio
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));      // Obtenemos acceso a la carpeta publica
app.use(express.json());                // Damos formato al body

// Formateamos la IP que nos regrese el usuario
app.use(FormatIP);

// Rutas de desarrolo
app.use('/api', require('./routes/development/users'));
app.use('/api', require('./routes/development/images'));
app.use('/api', require('./routes/development/ip'));

// Rutas generales
app.use('/food', require('./routes/general/food'));
// app.use('/adv', require('./routes/general/advanced'));

// Escuchamos peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${ process.env.PORT }`)
})