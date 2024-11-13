
import { Router } from "express";
import { LogginUser, RegisterUser } from "../controllers/auth";
import { check } from "express-validator";
import { ValidateFields } from "../middlewares/fieldValidator";

const router = Router();
router.post('/register', [
    check('user', "El usuario tiene que tener entre 4 a 20 caracteres").isLength({ min: 4, max: 20 }),
    check('password', "La contraseña tiene que tener mas de 4 caracteres").isLength({ min: 4 }),
    check('deviceIP', "IP invalida").not().isEmpty(),
    ValidateFields
], RegisterUser);

router.post('/login', [
    check('user', "El usuario tiene que tener entre 4 a 20 caracteres").isLength({ min: 4, max: 20 }),
    check('password', "La contraseña tiene que tener mas de 4 caracteres").isLength({ min: 4 }),
    ValidateFields
], LogginUser);

module.exports = router;