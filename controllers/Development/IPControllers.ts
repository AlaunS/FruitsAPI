import { Response } from "express";
import { UserModel } from "../../models/UserModel";
import bcrypt from 'bcryptjs';

export const AddIP = async(req: any, res: Response): Promise<any> => {
    
    const { user, ip } = req.body;
    try {
        
        const userModel = await UserModel.findOne({ user });
        if (!userModel){
            return res.status(500).json({
                status: 500,
                msg: "No existe ese usuario"
            })
        }

        if (userModel.ip.length >= 2){
            console.log("No pueden existir mas de 2 IP simultaneas")
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
                err: "Por favor revise los logs(Ip) para mas informacion"
            })
        }

        // Encriptamos la ip
        const salt = bcrypt.genSaltSync();
        const currentIP = bcrypt.hashSync(ip, salt);

        userModel.ip = [...userModel.ip, currentIP];
        await userModel.save();
        return res.status(201).json({
            status: 201,
            msg: "IP agregada exitosamente",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Ip) para mas informacion"
        })
    }
}

export const DeleteIP = async(req: any, res: Response): Promise<any> => {
    
    const { user, ip } = req.body;
    try {
        
        const userModel = await UserModel.findOne({ user });
        if (!userModel){
            return res.status(500).json({
                status: 500,
                msg: "no existe ese usuario"
            })
        }
        
        if (userModel.ip.length === 1){
            console.log("No puedes eliminar la unica IP de este usuario")
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
                err: "Por favor revise los logs(Ip) para mas informacion"
            })
        }

        const userModelIPS = [...userModel.ip];
        for (let i = 0; i < userModelIPS.length; i++){
            if (bcrypt.compareSync(ip, userModelIPS[i])){
                userModelIPS.splice(i, 1);
                break;
            }
        }

        userModel.ip = userModelIPS;
        await userModel.save();
        return res.status(201).json({
            status: 201,
            msg: "IP eliminada exitosamente",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Ip) para mas informacion"
        })
    }
}