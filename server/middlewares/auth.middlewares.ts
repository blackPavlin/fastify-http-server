import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import jwt from 'jsonwebtoken';
import { TokenData } from '../controllers/auth.controllers';

export default (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>,
    next: (error?: FastifyError | undefined) => void,
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
            request.body.login = (<TokenData>decodet).login;
            request.body.userID = (<TokenData>decodet).userID;

            next();
        } else {
            reply.status(401).send({ 
                error: 'Невалидный токен авторизации',
            });
        }
    });
};
