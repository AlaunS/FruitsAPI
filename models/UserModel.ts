import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        require: true
    },
    ip: {
        type: Array,
        require: true,
        default: []
    }
})

export const UserModel = model('User', UserSchema);