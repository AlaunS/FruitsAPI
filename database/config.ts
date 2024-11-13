import mongoose from "mongoose";

export const DBConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN ?? "");
        console.log("Db online")
    } catch (error) {
        console.log(error);
        throw new Error("Error in db initialization");
    }
}