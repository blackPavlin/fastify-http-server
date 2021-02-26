import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
    body: {
        required: ['login', 'password'],
        properties: {
            login: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        401: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};

export const signupSchema: FastifySchema = {
    body: {
        required: ['login', 'password'],
        properties: {
            login: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        409: {
            type: 'object',
            properties: {
                error: { type: 'string' },
            },
        },
        500: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' },
            },
        },
    },
};
