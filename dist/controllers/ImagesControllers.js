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
exports.DeleteImage = exports.CreateImage = void 0;
const ImageModel_1 = require("../models/ImageModel");
const ImagesHelpers_1 = require("../helpers/ImagesHelpers");
const CreateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    try {
        const imageModel = yield ImageModel_1.ImageModel.findOne({ name });
        if (imageModel) {
            return res.status(500).json({
                status: 500,
                msg: "La imagen ya existe",
            });
        }
        // Solicitamos la subida de la imagen
        const imageURL = yield (0, ImagesHelpers_1.RequestImageCreate)(res, name.toLowerCase() + '.png', req.file.buffer);
        const currentImg = new ImageModel_1.ImageModel(req.body);
        currentImg.url = imageURL;
        currentImg.name = (_a = currentImg.name) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        yield currentImg.save();
        return res.status(201).json({
            status: 201,
            msg: "Imagen creada exitosamente",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Img) para mas informacion"
        });
    }
});
exports.CreateImage = CreateImage;
const DeleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const imageModel = yield ImageModel_1.ImageModel.findOne({ name });
        if (!imageModel) {
            return res.status(500).json({
                status: 500,
                msg: "La imagen no existe",
            });
        }
        // Solicitamos la eliminacion de la imagen
        yield (0, ImagesHelpers_1.RequestImageDelete)(res, (name + '.png'));
        yield ImageModel_1.ImageModel.findOneAndDelete({ name });
        return res.status(201).json({
            status: 201,
            msg: "Imagen eliminada exitosamente",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Img) para mas informacion"
        });
    }
});
exports.DeleteImage = DeleteImage;
