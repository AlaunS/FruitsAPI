"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = require("../controllers/images");
const jwtValidator_1 = require("../middlewares/jwtValidator");
const router = (0, express_1.Router)();
router.get('/random', [jwtValidator_1.ValidateJWT], images_1.GetRandomImage); // Obtenemos una imagen aleatoria
router.get('/:name', [jwtValidator_1.ValidateJWT], images_1.GetImage); // Obtenemos la imagen introducida por el usuario
router.get('/', [jwtValidator_1.ValidateJWT], images_1.GetAllImages); // Obtener todas las imagenes del servicio
module.exports = router;
