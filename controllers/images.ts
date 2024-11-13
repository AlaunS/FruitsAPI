
import { Response, Request } from 'express';
import AWS from 'aws-sdk';
require('dotenv').config();

// Configuracion de AWS
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

// Funcion para obtener todas las imagenes en el servidor
export const GetAllImages = async(req: Request, res: Response): Promise<any> => {

    try {
        const data = await s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        const images: any[] = [];
        if (data.Contents){
            data.Contents.map((item) => {
                images.push({
                    name: item.Key?.replace(".png", ""),
                    url: `https://fruit-api.s3.amazonaws.com/${item.Key}`
                })
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "Consulta exitosa",
            res: images
        })

    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener imágenes",
            error
        });
    }
}

// Funcion para obtener una imagen del servidor
export const GetImage = async(req: Request, res: Response): Promise<any> => {

    try {
        const data = await s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        const image = data.Contents?.find((item) => item.Key?.replace('.png', "") === req.params.name);
        if (image){
            return res.status(200).json({
                ok: true,
                msg: "Consulta exitosa",
                res: {
                    name: req.params.name,
                    url: `https://fruit-api.s3.amazonaws.com/${image.Key}`
                }
            })
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "No se encontro la imagen",
                res: image
            })
        }

    } catch (error) {
        console.error(`Error al obtener la imagen ${req.params.name}:`, error);
        return res.status(500).json({
            ok: false,
            msg: `Error al obtener la imagen ${req.params.name}`,
            error
        });
    }
}

// Funcion para obtener una imagen random del servidor
export const GetRandomImage = async(req: Request, res: Response): Promise<any> => {
    try {
        const data = await s3.listObjectsV2({ Bucket: "fruit-api" }).promise();
        if (data.Contents){
            const size = data.Contents.length;
            const rand = Math.round(Math.random() * size);
            const img = data.Contents[rand - 1];

            return res.status(200).json({
                ok: true,
                msg: "Consulta exitosa",
                res: {
                    name: img.Key,
                    url: `https://fruit-api.s3.amazonaws.com/${img.Key}`
                }
            })
        }


    } catch (error) {
        console.error("Error al obtener una imagen random:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la imagen",
            error
        });
    }
}