"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    deviceIP: {
        type: Array,
        require: true,
        default: ""
    }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
