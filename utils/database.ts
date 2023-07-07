import mongoose from "mongoose";

let isConnected = false; // tracke the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    } 

    try {
        mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        });
    } catch (error) {
        console.log(error);
    }
}