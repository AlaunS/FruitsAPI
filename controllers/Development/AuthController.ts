import { Response } from "express";
import { UserModel } from "../../models/UserModel";
import bcrypt from 'bcryptjs';

export const RegisterUser = async(req: any, res: Response): Promise<any> => {
    
    const { user, password } = req.body;
    try {
        
        const currentIP = req.clientIp;
        const userModel = await UserModel.findOne({ user });
        if (userModel){
            return res.status(500).json({
                status: 500,
                msg: "Ya existe ese usuario"
            })
        }

        // Encriptamos la contraseña y la ip
        const currentUser = new UserModel(req.body);
        const salt = bcrypt.genSaltSync();
        currentUser.password = bcrypt.hashSync(password, salt);
        currentUser.ip = [bcrypt.hashSync(currentIP, salt)];

        await currentUser.save();
        return res.status(201).json({
            status: 201,
            msg: "Usuario creado exitosamente",
            res: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 201,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Usr) para mas informacion"
        })
    }
}