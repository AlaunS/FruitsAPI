"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
// Creamos el servidor de express
const app = (0, express_1.default)();
// Inicializamos cors
app.use((0, cors_1.default)());
app.use(express_1.default.static('public')); // Obtenemos el directorio publico
app.use(express_1.default.json()); // Lectura y parseo del body
// Rutas
app.use('/image', require('./routes/images.js'));
// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running server in port ${process.env.PORT}`);
});
