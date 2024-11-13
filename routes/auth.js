"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const fieldValidator_1 = require("../middlewares/fieldValidator");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)('user', "El usuario tiene que tener entre 4 a 20 caracteres").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)('password', "La contraseña tiene que tener mas de 4 caracteres").isLength({ min: 4 }),
    (0, express_validator_1.check)('deviceIP', "IP invalida").not().isEmpty(),
    fieldValidator_1.ValidateFields
], auth_1.RegisterUser);
router.post('/login', [
    (0, express_validator_1.check)('user', "El usuario tiene que tener entre 4 a 20 caracteres").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)('password', "La contraseña tiene que tener mas de 4 caracteres").isLength({ min: 4 }),
    fieldValidator_1.ValidateFields
], auth_1.LogginUser);
module.exports = router;
