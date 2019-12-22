import { Server, IncomingMessage, ServerResponse } from "http"
import { FastifyInstance, RegisterOptions, FastifyError } from "fastify"

import { login, logout, signup } from "../controllers/auth.controllers"

export default (
    server: FastifyInstance<Server, IncomingMessage, ServerResponse>, 
    options: RegisterOptions<Server, IncomingMessage, ServerResponse>, 
    next: (err?: FastifyError | undefined) => void,
) => {
    // Login user
    server.post("/login", login)

    // Create new user
    server.post("/signup", signup)

    server.get("/user", options, (req, res) => {
        res.code(200).send({ user: "Admin"})
    })

    next()
}