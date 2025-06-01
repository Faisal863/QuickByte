import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://21bd1a665dcsmc:FaisaL123@latest-app.b2cb2pu.mongodb.net/?retryWrites=true&w=majority&appName=Latest-App')
        .then(() => console.log('DB CONNECTED'));
}

