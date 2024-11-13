
import { Router } from "express";
import { GetAllImages, GetImage, GetRandomImage } from "../controllers/images";

const router = Router();
router.get('/random', GetRandomImage)   // Obtenemos una imagen aleatoria
router.get('/:name', GetImage);         // Obtenemos la imagen introducida por el usuario
router.get('/', GetAllImages);          // Obtener todas las imagenes del servicio

module.exports = router;