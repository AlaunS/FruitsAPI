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
exports.RenewToken = exports.LogginUser = exports.CreateUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
// Funcion para registrar un nuevo usuario
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { user } = req.body;
    try {
        const response = yield fetch('https://api.ipify.org?format=json');
        const { ip } = yield response.json();
        let nUser = yield User_1.UserModel.findOne({ user });
        if (nUser) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            });
        }
        nUser = new User_1.UserModel(req.body);
        // Encriptamos la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        nUser.password = bcryptjs_1.default.hashSync((_a = nUser.password) !== null && _a !== void 0 ? _a : "", salt);
        nUser.ip = ip;
        yield nUser.save();
        // Generamos el JWT
        const token = yield (0, jwt_1.GenerateJWT)(nUser.id, (_b = nUser.user) !== null && _b !== void 0 ? _b : "", (_c = nUser.ip) !== null && _c !== void 0 ? _c : "");
        res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: {
                id: nUser.id,
                user: nUser.user,
                token
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server failed"
        });
    }
});
exports.CreateUser = CreateUser;
// Funcion para logear un usuario existente
const LogginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { user, password } = req.body;
    try {
        let nUser = yield User_1.UserModel.findOne({ user });
        if (!nUser) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }
        // Confirmar los passwords
        const validPassword = bcryptjs_1.default.compareSync(password, (_a = nUser.password) !== null && _a !== void 0 ? _a : "");
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña incorrecta"
            });
        }
        // Generamos el JWT
        const token = yield (0, jwt_1.GenerateJWT)(nUser.id, (_b = nUser.user) !== null && _b !== void 0 ? _b : "", (_c = nUser.ip) !== null && _c !== void 0 ? _c : "");
        res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: {
                id: nUser.id,
                user: nUser.user,
                token
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Server failed"
        });
    }
});
exports.LogginUser = LogginUser;
// Funcion para renovar el token un usuario existente
const RenewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user, ip } = req;
    // Generar JWT
    const token = yield (0, jwt_1.GenerateJWT)(id, user, ip);
    return res.status(200).json({
        ok: false,
        msg: "Consulta exitosa",
        res: {
            id,
            token
        }
    });
});
exports.RenewToken = RenewToken;
