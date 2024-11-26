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
exports.RegisterUser = void 0;
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const currentIP = req.clientIp;
        const userModel = yield UserModel_1.UserModel.findOne({ user });
        if (userModel) {
            return res.status(500).json({
                status: 500,
                msg: "Ya existe ese usuario"
            });
        }
        // Encriptamos la contraseña y la ip
        const currentUser = new UserModel_1.UserModel(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        currentUser.password = bcryptjs_1.default.hashSync(password, salt);
        currentUser.ip = [bcryptjs_1.default.hashSync(currentIP, salt)];
        yield currentUser.save();
        return res.status(201).json({
            status: 201,
            msg: "Usuario creado exitosamente",
            res: {
                user
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 201,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Usr) para mas informacion"
        });
    }
});
exports.RegisterUser = RegisterUser;
