// backend/src/config/db.js

const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
    } catch (err) {
        console.error('MongoDB connection error', err)
        process.exit(1)
    }
}

module.exports = connectDB;