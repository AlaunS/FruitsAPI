import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const ValidateFields = (req: Request, res: Response, next: NextFunction): any => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            status: 400,
            msg: "Error en la validacion de parametros",
            errors: errors.mapped()
        })
    }

    next();
}