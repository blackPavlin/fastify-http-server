import mongoose from "mongoose"
import server from "./server"

void async function () {
    try {
        await mongoose.connect("mongodb://localhost:27017/fastify", {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        await server.listen(3000)
    } catch(error) {
        console.log(error)
    }
}()
