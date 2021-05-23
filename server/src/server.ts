import path from 'path';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySensible from 'fastify-sensible';
import fastifyAuth from 'fastify-auth';
import fastifyEnv from 'fastify-env';

import configSchema from './Config';
import authPlugin from './Plugins/auth.plugin';
import authController from './Controllers/auth.controller';
import periodController from './Controllers/period.controller';
import reportController from './Controllers/report.controller';

const server = fastify({
	logger: true,
	ignoreTrailingSlash: true,
});

server
	.register(fastifyCors, { origin: true, methods: ['GET', 'POST'] })
	.register(fastifySensible)
	.register(fastifyAuth)
	.register(fastifyEnv, {
		schema: configSchema,
		dotenv: { path: path.join(__dirname, '../env/local.config.env') },
	})
	.after(() => {
		server
			.register(authPlugin)
			.register(authController)
			.register(periodController, { prefix: '/period' })
			.register(reportController, { prefix: '/report' });
	});

export default server;
