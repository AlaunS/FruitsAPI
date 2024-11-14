import { Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from 'bcryptjs';
import { GenerateJWT } from "../helpers/jwt";
import { GenerateIP } from "../helpers/checkIp";

export const RegisterUser = async(req: Request, res: Response): Promise<any> => {

    const { user, password } = req.body;

    try {
        const ip = await GenerateIP();
        let newUser = await UserModel.findOne({ user });
        if (newUser){
            return res.status(500).json({
                ok: true,
                msg: "Ya existe el usuario"
            })
        }

        newUser = new UserModel(req.body);

        // Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);
        newUser.deviceIP = ip;

        await newUser.save();

        // Generaremos el JWT
        const token = await GenerateJWT(newUser.id, newUser.user ?? "");

        return res.status(200).json({
            ok: true,
            msg: "Registro realizado exitosamente",
            res: {
                id: newUser.id,
                user,
                token,
                deviceIP: newUser.deviceIP
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

export const LogginUser = async(req: Request, res: Response): Promise<any> => {

    const { user, password } = req.body;
    try {
        const newUser = await UserModel.findOne({ user });
        const ip = await GenerateIP();
        
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

        // Generaremos el JWT
        const token = await GenerateJWT(newUser.id, newUser.user ?? "");

        return res.status(201).json({
            ok: true,
            msg: "Loggin realizado exitosamente",
            res: {
                id: newUser.id,
                user,
                token,
                deviceIP: newUser.deviceIP,
                currentIP: ip
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