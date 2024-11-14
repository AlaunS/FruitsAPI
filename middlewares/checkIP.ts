import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";

export const CheckSameIP = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const clientIp = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.ip)?.toString().replace("::ffff:", "");
    const newUser = await UserModel.findOne({ user: req.params.user });

    console.log(clientIp)
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