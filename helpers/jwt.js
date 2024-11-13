"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateJWT = (id, user) => {
    return new Promise((resolve, reject) => {
        var _a;
        const payload = { id, user };
        jsonwebtoken_1.default.sign(payload, (_a = process.env.SECRET_JWT_SEED) !== null && _a !== void 0 ? _a : "", {}, (err, token) => {
            if (err) {
                console.log(err);
                reject("The token generation failed");
            }
            resolve(token);
        });
    });
};
exports.GenerateJWT = GenerateJWT;
