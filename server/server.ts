import path from 'path';
import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, { FastifyInstance } from 'fastify';
import authControllers from './auth/controllers';

const server: FastifyInstance<
	Server,
	IncomingMessage,
	ServerResponse
> = fastify({
	logger: true,
	ignoreTrailingSlash: true,
});

// Middlewares
server.register(require('fastify-cors'), { origin: true, methods: ['GET', 'POST'] });
server.register(require('fastify-static'), { root: path.join(__dirname, '../public') });
server.register(require('fastify-multipart'));

// Controllers
server.register(authControllers);

export default server;
