
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
config();

// Creamos el servidor de express
const app = express();

// Inicializamos cors
app.use(cors({ origin: '*' }));

app.use(express.static('public'));      // Obtenemos el directorio publico
app.use(express.json());                // Lectura y parseo del body

// Rutas
app.use('/image', require('./routes/images.js'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${ process.env.PORT }`)
})