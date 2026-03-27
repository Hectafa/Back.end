import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.MONGO_URI;

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

export const connectionDB = async () => {
    try {
        await mongoose.connect(URI);
    } catch (error) {
        console.log(error);
    }

}

