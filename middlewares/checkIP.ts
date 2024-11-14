import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";

export const CheckSameIP = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const clientIp = (req.ip || req.socket.remoteAddress)?.replace("::ffff:", "");
    const newUser = await UserModel.findOne({ user: req.params.user });

    if (newUser ){
        if (newUser.deviceIP !== clientIp){
            return res.status(500).json({
                ok: false,
                msg: "Este dispositivo no esta permitido"
            })
        }
    }

    next();
}