const mongoose = require('mongoose');

const connectDB = async (app) => {

        const strConnection = 'mongodb://localhost:27017/practica09';
        try {
            await mongoose.connect(strConnection);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
} 

module.exports = connectDB;