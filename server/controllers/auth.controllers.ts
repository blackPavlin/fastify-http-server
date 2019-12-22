import { ServerResponse } from "http"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { FastifyRequest, FastifyReply } from "fastify"
import userModel from "../models/user.model"

// Login user
export async function login (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>
) {
    const { login, password } = request.body
    if (!login || !password) {
        reply.code(400).send({ error: "В запросе отсутствует логин или пароль" })
    } else {
        const userData = await userModel.findOne({ login })
        if (!userData) {
            reply.code(401).send({ error: "Неверный логин или пароль" })
        } else {
            const isCorrect = bcrypt.compareSync(password, userData.password)
            if (isCorrect) {
                const token = jsonwebtoken.sign({
                    login: userData.login,
                    userId: userData._id,
                }, "sososi", { expiresIn: 60 * 60 })

                reply.code(200).send({ token })
            } else {
                reply.code(401).send({ error: "Неверный логин или пароль" })
            }
        }
    }
}

export async function logout (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>
) {

}

// Create new user
export async function signup (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>
) {
    const { login, password } = request.body
    if (!login || !password) {
        reply.code(400).send({ error: "В запросе отсутствует логин или пароль" })
    } else {
        const userData = await userModel.findOne({ login })
        if (userData) {
            reply.code(409).send({ error: "Такой пользователь уже существует" })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const userData = new userModel({
                login,
                password: bcrypt.hashSync(password, salt)
            })
            console.log(userData)
            await userData.save()
            reply.code(201).send({ message: "Пользователь успешно создан" })
        }
    }
}
