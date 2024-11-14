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
exports.CheckSameIP = void 0;
const User_1 = require("../models/User");
const checkIp_1 = require("../helpers/checkIp");
const CheckSameIP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = yield (0, checkIp_1.GenerateIP)();
    const user = yield User_1.UserModel.findOne({ user: req.params.user });
    if (user) {
        if (user.deviceIP !== ip) {
            return res.status(500).json({
                ok: false,
                msg: "Este dispositivo no tiene los privilegios necesarios"
            });
        }
    }
    next();
});
exports.CheckSameIP = CheckSameIP;
