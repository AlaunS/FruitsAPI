
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    user: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    ip: {
        type: String
    }
})

const UserModel = model("users", UserSchema);
export {
    UserModel
};