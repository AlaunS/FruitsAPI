
import { Router } from "express";
import { check } from "express-validator";
import { ValidateFields } from "../../middlewares/validateFormats";
import { RegisterUser } from "../../controllers/Development/AuthController";
import { CheckRol } from "../../middlewares/CheckRol";

const router = Router();
router.post('/register', [
    check("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    check("password", "Introduzca una contraseña valida").isLength({ min: 4 }),
    check("rol", "Introduzca un rol valido").isLength({ min: 4 }),
    ValidateFields,
    CheckRol,
], RegisterUser);

module.exports = router;