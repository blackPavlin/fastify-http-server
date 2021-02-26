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
    const bearer = request?.headers?.authorization;
    if (!bearer) {
        reply.status(401).send({
            error: 'Невалидный токен авторизации',
        });
    
        return
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        reply.status(401).send({
            error: 'Невалидный токен авторизации',
        });
    
        return
    }

    jwt.verify(token, <string>process.env.SECRET_KEY, (error, decodet) => {
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
