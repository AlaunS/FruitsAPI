"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./database/config.js");
(0, dotenv_1.config)();
// Creamos el servidor de express
const app = (0, express_1.default)();
// Conectamos a la base de datos
(0, config_js_1.DBConnection)();
app.use(express_1.default.static('public')); // Obtenemos el directorio publico
app.use(express_1.default.json()); // Lectura y parseo del body
// Parseo del body
app.use(express_1.default.json());
// Rutas
app.use('/image', require('./routes/images.js'));
app.use('/auth', require('./routes/auth.js'));
// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${process.env.PORT}`);
});
