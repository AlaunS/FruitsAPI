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
exports.CheckSameIP = void 0;
const User_1 = require("../../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CheckSameIP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = req.clientIp;
    const user = yield User_1.UserModel.findOne({ user: req.params.user });
    if (user) {
        if (!bcryptjs_1.default.compareSync(ip, user.deviceIP)) {
            return res.status(500).json({
                ok: false,
                msg: "Este dispositivo no tiene los privilegios necesarios",
                res: {
                    userIP: user.deviceIP,
                    currIP: ip
                }
            });
        }
    }
    next();
});
exports.CheckSameIP = CheckSameIP;
