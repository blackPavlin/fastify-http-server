import { FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { loginSchema, signupSchema } from './schemas';
import { loginService, signupService } from './services';

export default fp(async (server, options, next) => {
    server.post('/login', { schema: loginSchema }, loginHandler);
    server.post('/signup', { schema: signupSchema }, signupHandler);

    next();
});

interface LoginRequest {
    login: string;
    password: string;
}

export async function loginHandler(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    try {
        const { login, password } = <LoginRequest>request.body;
        const { code, msg } = await loginService(login, password);

        reply.code(code).send(msg);
    } catch (error) {
        reply.status(500).send(error);
    }
}

interface SignupRequest {
    login: string;
    password: string;
}

export async function signupHandler(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    try {
        const { login, password } = <SignupRequest>request.body;
        const { code, msg } = await signupService(login, password);

        reply.code(code).send(msg);
    } catch (error) {
        reply.status(500).send(error);
    }
}