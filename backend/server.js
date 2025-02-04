// /backend/server.js
/*
加载express，中间件，路由
*/

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerConfig')
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

connectDB(); // connect to database

const app = express();
app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)) // serve swagger docs
app.use('/api/auth', authRoutes); // use authorization routes
app.use('/api', userRoutes); // use user routes

app.listen(process.env.PORT, () => { 
    console.log(`Server running on port ${process.env.PORT}`)  
}); 