import { Server, IncomingMessage, ServerResponse } from "http"
import { FastifyInstance, RegisterOptions, FastifyError } from "fastify"

export default (
    server: FastifyInstance<Server, IncomingMessage, ServerResponse>, 
    options: RegisterOptions<Server, IncomingMessage, ServerResponse>, 
    next: (err?: FastifyError | undefined) => void,
) => {
    server.post("/", (request, reply) => {
        console.log(request.body)
        reply.code(200).send({ pong: 'it worked!' })
    })

    next()
}
