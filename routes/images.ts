
import { Router } from "express";
import { GetAllImages, GetImage, GetRandomImage } from "../controllers/images";
import { CheckSameIP } from "../middlewares/IP/checkIP";

const router = Router();
router.get('/random', [], GetRandomImage)   // Obtenemos una imagen aleatoria
router.get('/all', [], GetAllImages);       // Obtener todas las imagenes del servicio
router.get('/:name', [], GetImage);         // Obtenemos la imagen introducida por el usuario

module.exports = router;