import { NextFunction, Response } from "express";

export const ConvertIP = async(req: any, res: Response, next: NextFunction): Promise<any> => {

    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
}