import { Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from 'bcryptjs';

export const RegisterUser = async(req: any, res: Response): Promise<any> => {

    const { user, password } = req.body;

    try {
        const ip = req.clientIp;
        let newUser = await UserModel.findOne({ user });
        if (newUser){
            return res.status(500).json({
                ok: true,
                msg: "Ya existe el usuario"
            })
        }

        newUser = new UserModel(req.body);

        // Encriptamos la contraseña e ip
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);
        newUser.deviceIP = [bcrypt.hashSync(ip, salt)];

        await newUser.save();

        return res.status(200).json({
            ok: true,
            msg: "Registro realizado exitosamente",
            res: {
                id: newUser.id,
                user,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Internal server error"
        })
    }
}

export const LogginUser = async(req: any, res: Response): Promise<any> => {

    const { user, password } = req.body;
    try {
        const newUser = await UserModel.findOne({ user });
        
        if (!newUser){
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contraseña incorrectos"
            })
        }

        // Confirmamos las contraseñas
        const validPassword = bcrypt.compareSync(password, newUser.password ?? "");
        if (!validPassword){
            return res.status(400).json({
                ok: true,
                msg: "Usuario o contraseña incorrectos"
            })
        }

        return res.status(201).json({
            ok: true,
            msg: "Loggin realizado exitosamente",
            res: {
                id: newUser.id,
                user,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Internal server error"
        })
    }
}