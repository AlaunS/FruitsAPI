
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const ValidateIP = async (req: any, res: Response) => {
    const token: string = req.headers["x-token"];
    const decode: any = jwt.decode(token);
    let { ip } = decode;

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip: resIp } = await response.json();

        if (ip !== resIp) {
            return res.status(500).json({
                ok: false,
                msg: "Petición denegada: IP no coincide",
            });
        }

        return true;

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en la validación de la IP",
            error
        });
    }
};

