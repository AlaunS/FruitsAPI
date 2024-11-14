
import { Router } from "express";
import { GetAllImages, GetImage, GetRandomImage } from "../controllers/images";
import { CheckSameIP } from "../middlewares/IP/checkIP";
import { ConvertIP } from "../middlewares/IP/convertIP";

const router = Router();

// Obtenemos una imagen aleatoria
router.get('/random/:user', [
    ConvertIP,
    CheckSameIP
], GetRandomImage)   

// Obtener todas las imagenes del servicio
router.get('/all/:user', [
    ConvertIP,
    CheckSameIP
], GetAllImages);      

// Obtenemos la imagen introducida por el usuario
router.get('/:name/:user', [
    ConvertIP,
    CheckSameIP
], GetImage);         

module.exports = router;