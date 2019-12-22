import path from "path"
import fastify from "fastify"
import fastifyFormBody from "fastify-formbody"
import fastifyStatic from "fastify-static"
import authMiddlewares from "./middlewares/auth.middlewares"
import authRoutes from "./routes/auth.routes"

const server = fastify({ logger: true, ignoreTrailingSlash: true })

// Middlewares
server.register(fastifyStatic, { root: path.join(__dirname, "../public") })
server.register(fastifyFormBody)

// Routes
server.register(authRoutes, { preValidation: [authMiddlewares] })

export default server
