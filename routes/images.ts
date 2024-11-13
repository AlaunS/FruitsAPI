
import { Router } from "express";
import { GetAllImages, GetImage, GetRandomImage } from "../controllers/images";
import { ValidateJWT } from "../middlewares/jwtValidator";

const router = Router();
router.get('/random', [ValidateJWT], GetRandomImage)   // Obtenemos una imagen aleatoria
router.get('/:name', [ValidateJWT], GetImage);         // Obtenemos la imagen introducida por el usuario
router.get('/', [ValidateJWT], GetAllImages);          // Obtener todas las imagenes del servicio

module.exports = router;