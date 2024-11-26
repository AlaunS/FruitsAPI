"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const formatIP_1 = require("./middlewares/formatIP");
const config_1 = require("./database/config");
(0, dotenv_1.config)();
// Creamos una app de express
const app = (0, express_1.default)();
// Inicializar BD
(0, config_1.DBConnection)();
// Permitimos peticiones de cualquier sitio
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.static("public")); // Obtenemos acceso a la carpeta publica
app.use(express_1.default.json()); // Damos formato al body
// Formateamos la IP que nos regrese el usuario
app.use(formatIP_1.FormatIP);
// Rutas de desarrolo
app.use('/api', require('./routes/development/users'));
app.use('/api', require('./routes/development/images'));
app.use('/api', require('./routes/development/ip'));
// Rutas generales
app.use('/food', require('./routes/general/food'));
// app.use('/adv', require('./routes/general/advanced'));
// Escuchamos peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${process.env.PORT}`);
});
