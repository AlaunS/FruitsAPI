"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFormats_1 = require("../../middlewares/validateFormats");
const AuthController_1 = require("../../controllers/Development/AuthController");
const CheckRol_1 = require("../../middlewares/CheckRol");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)("password", "Introduzca una contraseña valida").isLength({ min: 4 }),
    (0, express_validator_1.check)("rol", "Introduzca un rol valido").isLength({ min: 4 }),
    validateFormats_1.ValidateFields,
    CheckRol_1.CheckRol,
], AuthController_1.RegisterUser);
module.exports = router;
