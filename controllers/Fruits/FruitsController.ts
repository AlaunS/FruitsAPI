import { Response } from "express";
import { ImageModel } from "../../models/ImageModel";
import { UserModel } from "../../models/UserModel";
import bcrypt from 'bcryptjs';

const FormatRes = (body: any[], user: any) => {
    const formatted: any[] = [];
    for (let i = 0; i < body.length; i++){
        const item = body[i];
        const itemName = item.name ? (item.name.slice(0, 1).toUpperCase() + item.name.slice(1, item.name.length).toLowerCase()) : "";

        if (user.rol === "Simple" && i == Math.floor(body.length/2)) break;
        if (user.rol === "Simple"){
            formatted.push({
                name: itemName,
                url: item.url,
            })
        }

        if (user.rol === "Avanzado"){
            formatted.push({
                name: itemName,
                category: item.category,
                calories: item.calories,
                url: item.url,
            })
        }
    }

    return formatted;
}

export const GetFruits = async(req: any, res: Response): Promise<any> => {
    
    try {
        const body = await ImageModel.find().exec();
        const user = await UserModel.findOne({ user: req.params.user });

        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            })
        }

        const formatted = FormatRes(body, user);
        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        })   
    }
}

export const GetFruitsByCategory = async(req: any, res: Response): Promise<any> => {

    try {
        const category = req.body.category;
        const body = await ImageModel.find().exec();
        const user = await UserModel.findOne({ user: req.params.user });

        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            })
        }

        const bodyFormat = FormatRes(body, user);
        const formatted: any[] = bodyFormat.filter((item) => item.category === category);

        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        })   
    }
}

export const GetAllFruitsCategories = async(req: any, res: Response): Promise<any> => {
    
    try {
        const body = await ImageModel.find().exec();
        const user = await UserModel.findOne({ user: req.params.user });

        if (!user) {
            return res.status(400).json({
                status: 400,
                msg: "El usuario no existe",
                err: "Consulte los logs para mas informacion"
            })
        }

        const bodyFormat = FormatRes(body, user);
        const formatted: any[] = bodyFormat.reduce((acc: any, item: any) => {
            if (!acc[item.category]){
                acc[item.category] = [];
            }

            acc[item.category].push(item);
            return acc;
        }, {});

        return res.status(200).json({
            status: 200,
            msg: "Consulta exitosa",
            res: formatted
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            msg: "Fallo interno del servidor",
            err: "Consulte los logs para mas informacion"
        })   
    }
}