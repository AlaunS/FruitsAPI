"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    ip: {
        type: String
    }
});
const UserModel = (0, mongoose_1.model)("users", UserSchema);
exports.UserModel = UserModel;
