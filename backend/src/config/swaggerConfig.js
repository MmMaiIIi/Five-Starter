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
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Task ID',
                        },
                        title: {
                            type: 'string',
                            description: 'Task title',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the task',
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Due date of the task',
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            description: 'Task priority level',
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            description: 'Current status of the task',
                        },
                        userId: {
                            type: 'string',
                            description: 'ID of the user who owns the task',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        username: {
                            type: 'string',
                            description: 'User\'s username',
                        },
                        googleId: {
                            type: 'string',
                            description: 'User\'s Google ID',
                        },
                        githubId: {
                            type: 'string',
                            description: 'User\'s GitHub ID',
                        },
                    },
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
