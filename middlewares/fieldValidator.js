"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateField = void 0;
const express_validator_1 = require("express-validator");
const ValidateField = (req, res, next) => {
    // Manejamos los errores
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }
    next();
};
exports.ValidateField = ValidateField;
