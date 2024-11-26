import { NextFunction, Response } from "express";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/UserModel";

export const CheckSameIP = async(req: any, res: Response, next: NextFunction): Promise<any> => {

    const ip = req.clientIp;
    const user = await UserModel.findOne({ user: req.params.user });

    if (user){
        const userIp = user.ip;
        let checked = false;
        for (let currIp of userIp){
            if (bcrypt.compareSync(ip, currIp)){
                checked = true;
                break;
            }
        }

        if (!checked)
            return res.status(200).json({
                ok: true,
                msg: "Dispositivo no reconocido",
                err: "Para mas ayuda informe al desarrollador",
            })
    }

    next();
}