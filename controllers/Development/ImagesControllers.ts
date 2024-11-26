import { Response } from "express";
import { ImageModel } from "../../models/ImageModel";
import { RequestImageCreate, RequestImageDelete } from "../../helpers/ImagesHelpers";

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

export const CreateImage = async(req: any, res: Response): Promise<any> => {

    const { name } = req.body;
    try {
        const imageModel = await ImageModel.findOne({ name });

        if (imageModel){
            return res.status(500).json({
                status: 500,
                msg: "La imagen ya existe",
            })
        }
        
        // Solicitamos la subida de la imagen
        const imageURL = await RequestImageCreate(res, name.toLowerCase() + '.png', req.file.buffer);
        const currentImg = new ImageModel(req.body);
        
        currentImg.url = imageURL;
        currentImg.name = currentImg.name?.toLowerCase();
        await currentImg.save();

        return res.status(201).json({
            status: 201,
            msg: "Imagen creada exitosamente",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Img) para mas informacion"
        })
    }
}

export const DeleteImage = async(req: any, res: Response): Promise<any> => {
    
    const { name } = req.body;
    try {

        const imageModel = await ImageModel.findOne({ name });
        if (!imageModel){
            return res.status(500).json({
                status: 500,
                msg: "La imagen no existe",
            })
        }
        
        // Solicitamos la eliminacion de la imagen
        await RequestImageDelete(res, (name + '.png'));
        await ImageModel.findOneAndDelete({ name });

        return res.status(201).json({
            status: 201,
            msg: "Imagen eliminada exitosamente",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            msg: "Error interno del servidor",
            err: "Por favor revise los logs(Img) para mas informacion"
        })
    }
}