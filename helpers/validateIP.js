"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIP = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateIP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-token"];
    const decode = jsonwebtoken_1.default.decode(token);
    let { ip } = decode;
    try {
        const response = yield fetch('https://api.ipify.org?format=json');
        const { ip: resIp } = yield response.json();
        if (ip !== resIp) {
            return res.status(500).json({
                ok: false,
                msg: "Petición denegada: IP no coincide",
            });
        }
        return true;
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en la validación de la IP",
            error
        });
    }
});
exports.ValidateIP = ValidateIP;
