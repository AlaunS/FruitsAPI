import { config } from "dotenv";
import mongoose from "mongoose";
config();

export const DBConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN ?? "");
        console.log("DB en linea")
    } catch (error) {
        console.log(error);
        throw new Error("Error al incializar la base de datos");
    }
}