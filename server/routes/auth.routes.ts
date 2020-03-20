import { Server, IncomingMessage, ServerResponse } from "http";
import { FastifyInstance, RegisterOptions, FastifyError } from "fastify";
import { login, signup } from "../controllers/auth.controllers";

export default (
    server: FastifyInstance<Server, IncomingMessage, ServerResponse>, 
    options: RegisterOptions<Server, IncomingMessage, ServerResponse>, 
    next: (err?: FastifyError | undefined) => void,
): void => {
    // Login user
    server.post("/login", login);

    // Create new user
    server.post("/signup", signup);

    next();
};