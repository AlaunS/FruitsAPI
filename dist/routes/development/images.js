"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFormats_1 = require("../../middlewares/validateFormats");
const ImagesControllers_1 = require("../../controllers/Development/ImagesControllers");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Funcion POST para crear nuevas imagenes dentro del servicio aws
router.post('/img/create', [
    upload.single('file'),
    (0, express_validator_1.check)("name", "Introduzca un nombre valido").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)("category", "Introduzca una categoria valida").isLength({ min: 4, max: 20 }),
    validateFormats_1.ValidateFields
], ImagesControllers_1.CreateImage);
// Funcion DELETE para eliminar imagenes dentro del servicio aws
router.delete('/img/delete', [
    (0, express_validator_1.check)("name", "Introduzca un nombre valido").isLength({ min: 4, max: 20 }),
    validateFormats_1.ValidateFields
], ImagesControllers_1.DeleteImage);
module.exports = router;
