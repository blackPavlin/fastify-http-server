import path from 'path';
import fastify from 'fastify';
import authRoutes from './routes/auth.routes';
import indexRoutes from './routes/index.routes';

const server = fastify({ logger: true, ignoreTrailingSlash: true });

// Middlewares
server.register(require('fastify-cors'), { origin: true, methods: ['GET', 'POST'] });
server.register(require('fastify-static'), { root: path.join(__dirname, '../public') });
server.register(require('fastify-formbody'));

// Routes
server.register(authRoutes);
server.register(indexRoutes);

export default server;
