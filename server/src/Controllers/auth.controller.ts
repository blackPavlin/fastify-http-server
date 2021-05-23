import { FastifyInstance, RegisterOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginSchema, SignupSchema } from '../Schemas/auth.schemas';
import Users from '../Models/user.model';

export type TokenData = {
	login: string;
};

export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
	//
	server.post<{ Body: FromSchema<typeof LoginSchema.body> }>(
		'/login',
		{ schema: LoginSchema },
		async (request, reply) => {
			const { login, password } = request.body;

			const user = await Users.findOne({ login }).select({ login: 1, password: 1 }).lean();
			if (!user) {
				throw server.httpErrors.unauthorized('Неверный логин или пароль');
			}

			if (!bcrypt.compareSync(password, user.password)) {
				throw server.httpErrors.unauthorized('Неверный логин или пароль');
			}

			const tokenData: TokenData = {
				login: user.login,
			};

			const token = jwt.sign(tokenData, server.config.SECRET_KEY, { expiresIn: 60 * 60 });

			reply.code(200).send({ token });
		},
	);

	//
	server.post<{ Body: FromSchema<typeof SignupSchema.body> }>(
		'/signup',
		{ schema: SignupSchema },
		async (request, reply) => {
			const { login, password } = request.body;

			const user = await Users.findOne({ login }).select({ login: 1 }).lean();
			if (user) {
				throw server.httpErrors.conflict('Такой пользователь уже существует');
			}

			await Users.create({
				login,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			});

			reply.code(201).send({ message: 'Пользователь успешно создан' });
		},
	);

	next();
};
