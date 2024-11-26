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
exports.RequestImageCreate = exports.RequestImageDelete = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new aws_sdk_1.default.S3();
const RequestImageDelete = (res, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: "fruit-api",
            Key: name
        };
        yield s3.deleteObject(params).promise();
        console.log("Helpers || Imagen eliminada exitosamente");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(helpers) para mas informacion"
        });
    }
});
exports.RequestImageDelete = RequestImageDelete;
const RequestImageCreate = (res, name, fileContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: "fruit-api",
            Key: name,
            Body: fileContent,
            ContentType: "image/png"
        };
        const image = yield s3.upload(params).promise();
        console.log("Helpers || Imagen subida exitosamente");
        return image.Location;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(helpers) para mas informacion"
        });
    }
});
exports.RequestImageCreate = RequestImageCreate;
