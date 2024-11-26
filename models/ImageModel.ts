import { model, Schema } from "mongoose";

const ImageSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: String,
        require: true
    },
    calories: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true,
        default: []
    }
})

export const ImageModel = model('Image', ImageSchema);