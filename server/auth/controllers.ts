import { FastifyInstance, RegisterOptions, FastifyError } from 'fastify';
import { loginSchema, signupSchema } from './schemas';
import { loginService, signupService } from './services';

interface LoginRequest {
    login: string;
    password: string;
}

interface SignupRequest {
    login: string;
    password: string;
}

export default (
    server: FastifyInstance,
    options: RegisterOptions,
    next: (error?: FastifyError | undefined) => void,
): void => {
    //
    server.post<{ Body: LoginRequest }>('/login', { schema: loginSchema }, async (request, reply) => {
        try {
            const { login, password } = request.body;
            const { code, msg } = await loginService(login, password);
    
            reply.code(code).send(msg);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    //
    server.post<{ Body: SignupRequest }>('/signup', { schema: signupSchema }, async (request, reply) => {
        try {
            const { login, password } = request.body;
            const { code, msg } = await signupService(login, password);
    
            reply.code(code).send(msg);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    next();
}

