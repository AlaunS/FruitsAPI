

import { Router } from "express";
import { check } from "express-validator";
import { ValidateFields } from "../../middlewares/validateFormats";
import { CreateImage, DeleteImage } from "../../controllers/Development/ImagesControllers";
import multer from "multer";

const router = Router();
const upload = multer();

// Funcion POST para crear nuevas imagenes dentro del servicio aws
router.post('/img/create', [
    upload.single('file'),
    check("name", "Introduzca un nombre valido").isLength({ min: 4, max: 20 }),
    check("category", "Introduzca una categoria valida").isLength({ min: 4, max: 20 }),
    ValidateFields
], CreateImage);

// Funcion DELETE para eliminar imagenes dentro del servicio aws
router.delete('/img/delete', [
    check("name", "Introduzca un nombre valido").isLength({ min: 4, max: 20 }),
    ValidateFields
], DeleteImage);

module.exports = router;