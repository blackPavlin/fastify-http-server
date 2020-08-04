import path from 'path';
import fastify from 'fastify';
import authControllers from './auth/controllers';

const server = fastify({ logger: true, ignoreTrailingSlash: true });

// Middlewares
server.register(require('fastify-cors'), { origin: true, methods: ['GET', 'POST'] });
server.register(require('fastify-static'), { root: path.join(__dirname, '../public') });
server.register(require('fastify-multipart'));
server.register(require('fastify-formbody'));

// Controllers
server.register(authControllers);

export default server;
