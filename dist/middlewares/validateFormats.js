"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFields = void 0;
const express_validator_1 = require("express-validator");
const ValidateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            msg: "Error en la validacion de parametros",
            errors: errors.mapped()
        });
    }
    next();
};
exports.ValidateFields = ValidateFields;
