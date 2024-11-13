"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateJWT = (req, res, next) => {
    var _a;
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "El token no existe"
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, (_a = process.env.SECRET_JWT_SEED) !== null && _a !== void 0 ? _a : "");
        req.id = payload.id;
        req.user = payload.user;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        });
    }
    next();
};
exports.ValidateJWT = ValidateJWT;