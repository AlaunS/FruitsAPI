"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FruitsController_1 = require("../../controllers/Fruits/FruitsController");
const express_validator_1 = require("express-validator");
const validateFormats_1 = require("../../middlewares/validateFormats");
const router = (0, express_1.Router)();
router.get('/images/:user', [], FruitsController_1.GetFruits);
router.get('/category/:user', [
    (0, express_validator_1.check)("category", "Introduzca una categoria valida").isLength({ min: 4 }),
    validateFormats_1.ValidateFields
], FruitsController_1.GetFruitsByCategory);
router.get('/categories/:user', [], FruitsController_1.GetAllFruitsCategories);
module.exports = router;
