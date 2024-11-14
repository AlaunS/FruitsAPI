import { NextFunction, Response } from "express";
import { UserModel } from "../../models/User";
import bcrypt from 'bcryptjs';

export const CheckSameIP = async(req: any, res: Response, next: NextFunction): Promise<any> => {

    const ip = req.clientIp;
    const user = await UserModel.findOne({ user: req.params.user });

    if (user){
        const userIp = user.deviceIP;
        if (!bcrypt.compareSync(ip, userIp[0])){
            if (userIp.length > 1){
                for (let currIp of userIp){
                    if (bcrypt.compareSync(ip, currIp)){
                        break;
                        next();
                    }
                }
            }
            else return res.status(200).json({
                ok: true,
                msg: "Dispositivo no reconocido",
                err: "Para mas ayuda informe al desarrollador",
            })
        }
    }

    next();
}