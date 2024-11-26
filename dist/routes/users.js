"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFormats_1 = require("../middlewares/validateFormats");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.check)("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)("password", "Introduzca una contraseña valida").isLength({ min: 4 }),
    validateFormats_1.ValidateFields
], AuthController_1.RegisterUser);
module.exports = router;
