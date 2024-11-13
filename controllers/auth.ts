
import { Response, Request } from 'express';
import { UserModel } from '../models/User';
import bcrypt from 'bcryptjs';
import { GenerateJWT } from '../helpers/jwt';

// Funcion para registrar un nuevo usuario
export const CreateUser = async(req: Request, res: Response): Promise<any> => {

    const { user } = req.body;

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();

        let nUser = await UserModel.findOne({ user });
        if (nUser){
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            })
        }

        nUser = new UserModel(req.body);

        // Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        nUser.password = bcrypt.hashSync(nUser.password ?? "", salt);
        nUser.ip = ip;

        await nUser.save();

        // Generamos el JWT
        const token = await GenerateJWT(nUser.id, nUser.user ?? "", nUser.ip ?? "");

        res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: {
                id: nUser.id,
                user: nUser.user,
                token
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Server failed"
        })
    }
}

// Funcion para logear un usuario existente
export const LogginUser = async(req: Request, res: Response): Promise<any> => {

    const { user, password } = req.body;

    try {
        let nUser = await UserModel.findOne({ user });
        if (!nUser){
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, nUser.password ?? "");
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o contraseña incorrecta"
            })
        }

        // Generamos el JWT
        const token = await GenerateJWT(nUser.id, nUser.user ?? "", nUser.ip ?? "");
        
        res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: {
                id: nUser.id,
                user: nUser.user,
                token
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Server failed"
        })
    }
}

// Funcion para renovar el token un usuario existente
export const RenewToken = async(req: any, res: Response): Promise<any> => {

    const { id, user, ip } = req;

    // Generar JWT
    const token = await GenerateJWT(id, user, ip);

    return res.status(200).json({
        ok: false,
        msg: "Consulta exitosa",
        res: {
            id,
            token
        }
    })
}