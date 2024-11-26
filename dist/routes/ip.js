"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFormats_1 = require("../middlewares/validateFormats");
const IPControllers_1 = require("../controllers/IPControllers");
const router = (0, express_1.Router)();
router.post('/ip/add', [
    (0, express_validator_1.check)("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)("ip", "Introduzca una ip valida").isLength({ min: 4 }),
    validateFormats_1.ValidateFields
], IPControllers_1.AddIP);
router.delete('/ip/del', [
    (0, express_validator_1.check)("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    (0, express_validator_1.check)("ip", "Introduzca una ip valida").isLength({ min: 4 }),
    validateFormats_1.ValidateFields
], IPControllers_1.DeleteIP);
module.exports = router;
