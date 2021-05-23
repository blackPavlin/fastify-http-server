import { FastifyPluginCallback, FastifyRequest, FastifyReply } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { TokenData } from '../Controllers/auth.controller';

declare module 'fastify' {
	export interface FastifyInstance {
		verifyJWT(): void;
	}

	export interface FastifyRequest {
		user: TokenData;
	}
}

const authPlugin: FastifyPluginCallback = (server, options, done) => {
	server.decorate(
		'verifyJWT',
		function (request: FastifyRequest, reply: FastifyReply, next: (err?: Error) => void): void {
			const bearer = request?.headers?.authorization;
			if (!bearer) {
				return next(new Error('Невалидный токен авторизации'));
			}

			const [, token] = bearer.split(' ');
			if (!token) {
				return next(new Error('Невалидный токен авторизации'));
			}

			jwt.verify(token, server.config.SECRET_KEY, (error, decodet) => {
				if (error || !decodet) {
					return next(new Error('Невалидный токен авторизации'));
				}

				request.user = {
					login: (decodet as TokenData).login,
				};

				next();
			});
		},
	);

	done();
};

export default fastifyPlugin(authPlugin);
