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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFruitsCategories = exports.GetFruitsByCategory = exports.GetFruits = void 0;
const ImageModel_1 = require("../../models/ImageModel");
const UserModel_1 = require("../../models/UserModel");
const FormatRes = (body, user) => {
    const formatted = [];
    for (let i = 0; i < body.length; i++) {
        const item = body[i];
        const itemName = item.name ? (item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length).toLowerCase()) : "";
        if (user.rol === "Simple" && i == Math.floor(body.length / 2))
            break;
        if (user.rol === "Simple") {
            formatted.push({
                name: itemName,
                url: item.url,
            });
        }
        if (user.rol === "Avanzado") {
            formatted.push({
                name: itemName,
                category: item.category,
                calories: item.calories,
                url: item.url,
            });
        }
    }
    return formatted;
};
const GetFruits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield ImageModel_1.ImageModel.find().exec();
        const user = yield UserModel_1.UserModel.findOne({ user: req.params.user });
        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            });
        }
        const formatted = FormatRes(body, user);
        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        });
    }
});
exports.GetFruits = GetFruits;
const GetFruitsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body.category;
        const body = yield ImageModel_1.ImageModel.find().exec();
        const user = yield UserModel_1.UserModel.findOne({ user: req.params.user });
        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            });
        }
        const bodyFormat = FormatRes(body, user);
        const formatted = bodyFormat.filter((item) => item.category === category);
        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        });
    }
});
exports.GetFruitsByCategory = GetFruitsByCategory;
const GetAllFruitsCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield ImageModel_1.ImageModel.find().exec();
        const user = yield UserModel_1.UserModel.findOne({ user: req.params.user });
        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            });
        }
        const bodyFormat = FormatRes(body, user);
        const formatted = bodyFormat.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        });
    }
});
exports.GetAllFruitsCategories = GetAllFruitsCategories;
