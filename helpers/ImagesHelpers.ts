
import aws from 'aws-sdk';
import { Response } from 'express';

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
const s3 = new aws.S3();

export const RequestImageDelete = async(res: Response, name: string): Promise<any> => {
    try {
        const params = {
            Bucket: "fruit-api",
            Key: name
        }
        
        await s3.deleteObject(params).promise();
        console.log("Helpers || Imagen eliminada exitosamente");
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(helpers) para mas informacion"
        })
    }
}

export const RequestImageCreate = async(res: Response, name: string, fileContent: Buffer): Promise<any> => {
    try {
        const params = {
            Bucket: "fruit-api",
            Key: name,
            Body: fileContent,
            ContentType: "image/png"
        }
        
        const image = await s3.upload(params).promise();
        console.log("Helpers || Imagen subida exitosamente");
        return image.Location;
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(helpers) para mas informacion"
        })
    }
}