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
exports.LogginUser = exports.RegisterUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user, password, deviceIP } = req.body;
    try {
        const clientIp = req.ip || req.socket.remoteAddress;
        let newUser = yield User_1.UserModel.findOne({ user });
        if (newUser) {
            return res.status(500).json({
                ok: true,
                msg: "Ya existe el usuario"
            });
        }
        newUser = new User_1.UserModel(req.body);
        // Encriptamos la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        newUser.deviceIP = (clientIp !== null && clientIp !== void 0 ? clientIp : "").replace("::ffff:", "");
        yield newUser.save();
        // Generaremos el JWT
        const token = yield (0, jwt_1.GenerateJWT)(newUser.id, (_a = newUser.user) !== null && _a !== void 0 ? _a : "");
        return res.status(200).json({
            ok: true,
            msg: "Registro realizado exitosamente",
            res: {
                id: newUser.id,
                user,
                token,
                deviceIP
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Internal server error"
        });
    }
});
exports.RegisterUser = RegisterUser;
const LogginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { user, password } = req.body;
    try {
        const newUser = yield User_1.UserModel.findOne({ user });
        const clientIp = req.ip || req.socket.remoteAddress;
        if (!newUser) {
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contraseña incorrectos"
            });
        }
        // Confirmamos las contraseñas
        const validPassword = bcryptjs_1.default.compareSync(password, (_a = newUser.password) !== null && _a !== void 0 ? _a : "");
        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contraseña incorrectos"
            });
        }
        // Generaremos el JWT
        const token = yield (0, jwt_1.GenerateJWT)(newUser.id, (_b = newUser.user) !== null && _b !== void 0 ? _b : "");
        return res.status(201).json({
            ok: true,
            msg: "Loggin realizado exitosamente",
            res: {
                id: newUser.id,
                user,
                token,
                deviceIP: newUser.deviceIP,
                currentIP: clientIp
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Internal server error"
        });
    }
});
exports.LogginUser = LogginUser;
