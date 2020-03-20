import { ServerResponse } from "http";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";
import userModel from "../models/user.model";

// Login user
export async function login (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>
): Promise<void> {
    try {
        const { login, password } = request.body;
        if (!login || !password) {
            reply.code(400).send({ error: "В запросе отсутствует логин или пароль" });
            return
        }

        const userData = await userModel.findOne({ login });
        if (!userData) {
            reply.code(401).send({ error: "Неверный логин или пароль" });
            return
        }

        const isCorrect = bcrypt.compareSync(password, userData.password);
        if (!isCorrect) {
            reply.code(401).send({ error: "Неверный логин или пароль" });
            return
        }

        const token = jsonwebtoken.sign({
            login: userData.login,
            userID: userData._id,
        }, <string>process.env.SECRET_KEY, 
        { expiresIn: 60 * 60 }
        );

        reply.code(200).send({ token });
    } catch(error) {
        reply.status(500).send(error);
    }
};

// Create new user
export async function signup (
    request: FastifyRequest, 
    reply: FastifyReply<ServerResponse>
): Promise<void> {
    try {
        const { login, password } = request.body;
        if (!login || !password) {
            reply.code(400).send({ error: "В запросе отсутствует логин или пароль" });
            return
        }

        const candidate = await userModel.findOne({ login })
        if (candidate) {
            reply.code(409).send({ error: "Такой пользователь уже существует" });
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const userData = new userModel({
            login,
            password: bcrypt.hashSync(password, salt),
        });

        await userData.save();
        reply.code(201).send({ message: "Пользователь успешно создан" });
    } catch(error) {
        reply.status(500).send(error);
    }
}
