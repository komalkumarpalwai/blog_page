const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase the server selection timeout
            socketTimeoutMS: 45000 // Increase the socket timeout
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;
