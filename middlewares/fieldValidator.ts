
import express, { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const ValidateField = (req: Request, res: Response, next: NextFunction): any => {
    
    // Manejamos los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    next();
}