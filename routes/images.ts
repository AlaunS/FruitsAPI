
import { Router } from "express";
import { GetAllImages, GetImage, GetRandomImage } from "../controllers/images";
import { CheckSameIP } from "../middlewares/checkIP";

const router = Router();
router.get('/random/:user', CheckSameIP, GetRandomImage)   // Obtenemos una imagen aleatoria
router.get('/:name/:user', CheckSameIP, GetImage);         // Obtenemos la imagen introducida por el usuario
router.get('/all/:user', CheckSameIP, GetAllImages);       // Obtener todas las imagenes del servicio

module.exports = router;