import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";
import { GenerateIP } from "../helpers/checkIp";

export const CheckSameIP = async(req: Request, res: Response, next: NextFunction): Promise<any> => {

    const ip = await GenerateIP();
    const user = await UserModel.findOne({ user: req.params.user });

    if (user){
        if (user.deviceIP !== ip){
            return res.status(500).json({
                ok: false,
                msg: "Este dispositivo no tiene los privilegios necesarios",
                res: {
                    userIP: user.deviceIP,
                    currIP: ip
                }
            })
        }
    }

    next();
}