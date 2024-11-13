
import { Router } from "express";
import { CreateUser, LogginUser, RenewToken } from "../controllers/auth";
import { check } from "express-validator";
import { ValidateField } from "../middlewares/fieldValidator";
import { ValidateJWT } from "../middlewares/jwtValidator";

const router = Router();

// Crea nuevos usuarios
router.post('/register', [
    check('user', 'El nombre tiene que tener entre 4 a 25 caracteres').isLength({ min: 4, max: 25 }),
    check('password', 'La contraseña tiene que tener mas de 4 caracterse').isLength({ min: 4 }),
    ValidateField
], CreateUser);   

// Loggea usuarios existentes
router.post('/login', [
    check('user', 'El nombre tiene que tener entre 4 a 25 caracteres').isLength({ min: 4, max: 25 }),
    check('password', 'La contraseña tiene que tener mas de 4 caracterse').isLength({ min: 4 }),
    ValidateField
], LogginUser);

// Renovar token
router.get('/renew', ValidateJWT, RenewToken);

module.exports = router;