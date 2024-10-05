import mongoose from "mongoose";
export const ConnectDB = async () => {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
}
