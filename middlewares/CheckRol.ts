import { NextFunction, Request, Response } from "express";

export const CheckRol = (req: Request, res: Response, next: NextFunction): any => {

    const arrRols = ["Simple", "Avanzado"]
    const { rol } = req.body;

    for (let i = 0; i < arrRols.length; i++){
        if (arrRols[i] === rol){
            return next();
        }
    }

    return res.status(500).json({
        status: 500,
        msg: "Error en la validacion de roles",
    })
}