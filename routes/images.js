"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = require("../controllers/images");
const router = (0, express_1.Router)();
router.get('/random', [], images_1.GetRandomImage); // Obtenemos una imagen aleatoria
router.get('/all', [], images_1.GetAllImages); // Obtener todas las imagenes del servicio
router.get('/:name', [], images_1.GetImage); // Obtenemos la imagen introducida por el usuario
module.exports = router;
