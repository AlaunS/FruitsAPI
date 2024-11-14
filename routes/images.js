"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = require("../controllers/images");
const checkIP_1 = require("../middlewares/IP/checkIP");
const router = (0, express_1.Router)();
router.get('/random/:user', checkIP_1.CheckSameIP, images_1.GetRandomImage); // Obtenemos una imagen aleatoria
router.get('/all/:user', checkIP_1.CheckSameIP, images_1.GetAllImages); // Obtener todas las imagenes del servicio
router.get('/:name/:user', checkIP_1.CheckSameIP, images_1.GetImage); // Obtenemos la imagen introducida por el usuario
module.exports = router;
