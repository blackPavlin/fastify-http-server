import { ServerResponse } from "http"
import { FastifyRequest, FastifyReply, FastifyError } from "fastify"
import jwt, { VerifyErrors } from "jsonwebtoken"

export default (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>,
    next: (err?: FastifyError | undefined) => void,
) => {
    const { authorization } = request.headers
    if (typeof authorization !== "undefined") {
        const [, token] = authorization.split(" ")
        jwt.verify(token, "sososi", (error: VerifyErrors, decodet: object | string) => {
            if (!error) {
                // 
                next()
            } else {
                reply.status(403).send({ error: "В доступе отказано"})
            }
        })
    } else {
        reply.status(403).send({ error: "В доступе отказано"})
    }
}
