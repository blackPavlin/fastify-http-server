import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance, RegisterOptions, FastifyError } from 'fastify';
import { login, signup } from '../controllers/auth.controllers';

export default (
    server: FastifyInstance<Server, IncomingMessage, ServerResponse>, 
    options: RegisterOptions<Server, IncomingMessage, ServerResponse>, 
    next: (error?: FastifyError | undefined) => void,
): void => {
    // Login user
    server.post('/login', {
        schema: {
            body: {
                required: [
                    'login',
                    'password',
                ],
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
            },
        },
    }, login);

    // Create new user
    server.post('/signup', {
        schema: {
            body: {
                required: [
                    'login',
                    'password',
                ],
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
            },
        },
    }, signup);

    next();
};
