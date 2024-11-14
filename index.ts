
import { config } from 'dotenv';
import express from 'express';
import { DBConnection } from './database/config';
import { ConvertIP } from './middlewares/IP/convertIP';
config();

// Creamos el servidor de express
const app = express();

// Inicializar BD
DBConnection();

// Inicializamos cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));      // Obtenemos el directorio publico
app.use(express.json());                // Lectura y parseo del body

// Formateamos la ip para su uso posterior
app.use(ConvertIP);

// Rutas
app.use('/image', require('./routes/images.js'));
app.use('/auth', require('./routes/auth.js'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${ process.env.PORT }`)
})