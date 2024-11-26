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
exports.DeleteIP = exports.AddIP = void 0;
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AddIP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, ip } = req.body;
    try {
        const userModel = yield UserModel_1.UserModel.findOne({ user });
        if (!userModel) {
            return res.status(500).json({
                status: 500,
                msg: "No existe ese usuario"
            });
        }
        if (userModel.ip.length >= 2) {
            console.log("No pueden existir mas de 2 IP simultaneas");
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
                err: "Por favor revise los logs(Ip) para mas informacion"
            });
        }
        // Encriptamos la ip
        const salt = bcryptjs_1.default.genSaltSync();
        const currentIP = bcryptjs_1.default.hashSync(ip, salt);
        userModel.ip = [...userModel.ip, currentIP];
        yield userModel.save();
        return res.status(201).json({
            status: 201,
            msg: "IP agregada exitosamente",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Ip) para mas informacion"
        });
    }
});
exports.AddIP = AddIP;
const DeleteIP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, ip } = req.body;
    try {
        const userModel = yield UserModel_1.UserModel.findOne({ user });
        if (!userModel) {
            return res.status(500).json({
                status: 500,
                msg: "no existe ese usuario"
            });
        }
        if (userModel.ip.length === 1) {
            console.log("No puedes eliminar la unica IP de este usuario");
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
                err: "Por favor revise los logs(Ip) para mas informacion"
            });
        }
        const userModelIPS = [...userModel.ip];
        for (let i = 0; i < userModelIPS.length; i++) {
            if (bcryptjs_1.default.compareSync(ip, userModelIPS[i])) {
                userModelIPS.splice(i, 1);
                break;
            }
        }
        userModel.ip = userModelIPS;
        yield userModel.save();
        return res.status(201).json({
            status: 201,
            msg: "IP eliminada exitosamente",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Ip) para mas informacion"
        });
    }
});
exports.DeleteIP = DeleteIP;
