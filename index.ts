
import { config } from 'dotenv';
import express from 'express';
import { DBConnection } from './database/config.js';
config();

// Creamos el servidor de express
const app = express();

// Conectamos a la base de datos
DBConnection();

app.use(express.static('public'));      // Obtenemos el directorio publico
app.use(express.json());                // Lectura y parseo del body

// Parseo del body
app.use(express.json());

// Rutas
app.use('/image', require('./routes/images.js'));
app.use('/auth', require('./routes/auth.js'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${ process.env.PORT }`)
})