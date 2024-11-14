"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = require("../controllers/images");
const checkIP_1 = require("../middlewares/IP/checkIP");
const convertIP_1 = require("../middlewares/IP/convertIP");
const router = (0, express_1.Router)();
// Obtenemos una imagen aleatoria
router.get('/random/:user', [
    convertIP_1.ConvertIP,
    checkIP_1.CheckSameIP
], images_1.GetRandomImage);
// Obtener todas las imagenes del servicio
router.get('/all/:user', [
    convertIP_1.ConvertIP,
    checkIP_1.CheckSameIP
], images_1.GetAllImages);
// Obtenemos la imagen introducida por el usuario
router.get('/:name/:user', [
    convertIP_1.ConvertIP,
    checkIP_1.CheckSameIP
], images_1.GetImage);
module.exports = router;
