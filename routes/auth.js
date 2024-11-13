"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const fieldValidator_1 = require("../middlewares/fieldValidator");
const jwtValidator_1 = require("../middlewares/jwtValidator");
const router = (0, express_1.Router)();
// Crea nuevos usuarios
router.post('/register', [
    (0, express_validator_1.check)('user', 'El nombre tiene que tener entre 4 a 25 caracteres').isLength({ min: 4, max: 25 }),
    (0, express_validator_1.check)('password', 'La contraseña tiene que tener mas de 4 caracterse').isLength({ min: 4 }),
    fieldValidator_1.ValidateField
], auth_1.CreateUser);
// Loggea usuarios existentes
router.post('/login', [
    (0, express_validator_1.check)('user', 'El nombre tiene que tener entre 4 a 25 caracteres').isLength({ min: 4, max: 25 }),
    (0, express_validator_1.check)('password', 'La contraseña tiene que tener mas de 4 caracterse').isLength({ min: 4 }),
    fieldValidator_1.ValidateField
], auth_1.LogginUser);
// Renovar token
router.get('/renew', jwtValidator_1.ValidateJWT, auth_1.RenewToken);
module.exports = router;
