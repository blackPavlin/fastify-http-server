import { Server, IncomingMessage, ServerResponse } from "http";
import { FastifyInstance, RegisterOptions, FastifyError } from "fastify";
import authMiddlewares from "../middlewares/auth.middlewares";

export default (
    server: FastifyInstance<Server, IncomingMessage, ServerResponse>, 
    options: RegisterOptions<Server, IncomingMessage, ServerResponse>, 
    next: (err?: FastifyError | undefined) => void,
): void => {
    server.get("/ping", { preValidation: [authMiddlewares] }, (request, reply) => {
        console.log(request.body)
        reply.code(200).send({ pong: 'it worked!' })
    })

    next()
};
