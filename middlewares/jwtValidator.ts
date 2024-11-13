
import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export const ValidateJWT = (req: any, res: Response, next: NextFunction): any => {

    const token = req.header('x-token');
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: "El token no existe"
        });
    }

    try {
        
        const payload: any = jwt.verify(token, process.env.SECRET_JWT_SEED ?? "");
        req.id = payload.id;
        req.user = payload.user;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        });
    }
    
    next();
}