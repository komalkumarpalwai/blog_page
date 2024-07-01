const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
async function connectDB() {
    try {
        await mongoose.connect('process.env.MONGO_ONLLINE', {
           
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
