import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { TokenData } from './services';

declare module 'fastify' {
    interface FastifyRequest {
        auth: TokenData;
    }
}

export default (
    request: FastifyRequest, 
    reply: FastifyReply,
    next: HookHandlerDoneFunction,
): void => {
    const { authorization } = request.headers;
    if (!authorization) {
        reply.status(401).send({
            error: 'Невалидный токен авторизации',
        });

        return
    }

    const [, token] = authorization.split(' ');
    if (!token) {
        reply.status(401).send({
            error: 'Невалидный токен авторизации',
        });

        return
    }

    jwt.verify(<string>token, <string>process.env.SECRET_KEY, (error, decodet) => {
        if (!error) {
            request.auth.login = (<TokenData>decodet).login;
            next();
        } else {
            reply.status(401).send({ 
                error: 'Невалидный токен авторизации',
            });
        }
    });
}
