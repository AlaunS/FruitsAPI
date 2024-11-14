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
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const ip = req.clientIp;
        let newUser = yield User_1.UserModel.findOne({ user });
        if (newUser) {
            return res.status(500).json({
                ok: true,
                msg: "Ya existe el usuario"
            });
        }
        newUser = new User_1.UserModel(req.body);
        // Encriptamos la contraseña e ip
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        newUser.deviceIP = [bcryptjs_1.default.hashSync(ip, salt)];
        yield newUser.save();
        return res.status(200).json({
            ok: true,
            msg: "Registro realizado exitosamente",
            res: {
                id: newUser.id,
                user,
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
    var _a;
    const { user, password } = req.body;
    try {
        const newUser = yield User_1.UserModel.findOne({ user });
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
        return res.status(201).json({
            ok: true,
            msg: "Loggin realizado exitosamente",
            res: {
                id: newUser.id,
                user,
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
