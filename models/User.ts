import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    deviceIP: {
        type: Array,
        require: true,
        default: ""
    }
});

export const UserModel = model('User', UserSchema);