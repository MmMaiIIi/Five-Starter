// src/config/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FIVE API',
            version: '1.0.0',
            description: 'FIVE API documentation for express application',
        },
        servers: [
            {
                url: process.env.SERVER_URL,
            },
        ],  
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;           
