"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: String,
        require: true
    },
    calories: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true,
        default: []
    }
});
exports.ImageModel = (0, mongoose_1.model)('Image', ImageSchema);
