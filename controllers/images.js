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
exports.GetRandomImage = exports.GetImage = exports.GetAllImages = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const validateIP_1 = require("../helpers/validateIP");
require('dotenv').config();
// Configuracion de AWS
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
// Funcion para obtener todas las imagenes en el servidor
const GetAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validamos que la ip sea de los dispositivos admitidos
    yield (0, validateIP_1.ValidateIP)(req, res);
    try {
        const data = yield s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        const images = [];
        if (data.Contents) {
            data.Contents.map((item) => {
                var _a;
                images.push({
                    name: (_a = item.Key) === null || _a === void 0 ? void 0 : _a.replace(".png", ""),
                    url: `https://fruit-api.s3.amazonaws.com/${item.Key}`
                });
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: images
        });
    }
    catch (error) {
        console.error("Error al obtener imágenes:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener imágenes",
            error
        });
    }
});
exports.GetAllImages = GetAllImages;
// Funcion para obtener una imagen del servidor
const GetImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validamos que la ip sea de los dispositivos admitidos
    yield (0, validateIP_1.ValidateIP)(req, res);
    try {
        const data = yield s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        const image = (_a = data.Contents) === null || _a === void 0 ? void 0 : _a.find((item) => { var _a; return ((_a = item.Key) === null || _a === void 0 ? void 0 : _a.replace('.png', "")) === req.params.name; });
        if (image) {
            return res.status(200).json({
                ok: true,
                msg: "Consulta exitosa",
                res: {
                    name: req.params.name,
                    url: `https://fruit-api.s3.amazonaws.com/${image.Key}`
                }
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "No se encontro la imagen",
                res: image
            });
        }
    }
    catch (error) {
        console.error(`Error al obtener la imagen ${req.params.name}:`, error);
        return res.status(500).json({
            ok: false,
            msg: `Error al obtener la imagen ${req.params.name}`,
            error
        });
    }
});
exports.GetImage = GetImage;
// Funcion para obtener una imagen random del servidor
const GetRandomImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validamos que la ip sea de los dispositivos admitidos
    yield (0, validateIP_1.ValidateIP)(req, res);
    try {
        const data = yield s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        if (data.Contents) {
            const size = data.Contents.length;
            const rand = Math.floor(Math.random() * size);
            const img = data.Contents[rand];
            console.log(size, rand);
            return res.status(200).json({
                ok: true,
                msg: "Consulta exitosa",
                res: {
                    name: img.Key,
                    url: `https://fruit-api.s3.amazonaws.com/${img.Key}`
                }
            });
        }
    }
    catch (error) {
        console.error("Error al obtener una imagen random:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la imagen",
            error
        });
    }
});
exports.GetRandomImage = GetRandomImage;
