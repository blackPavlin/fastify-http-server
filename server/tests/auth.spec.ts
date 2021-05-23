import * as database from './helpers/database';
import server from '../src/server';

const testLogin = 'admin@admin.com';
const testPassword = 'admin';

describe('Тест авторизации', () => {
	beforeAll(async () => {
		await server.ready();
		await database.connect();
	});

	afterAll(async () => {
		await server.close();
		await database.closeDatabase();
	});

	it('Вход без указания логина и пароля', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/login',
			payload: {},
		});

		expect(response.statusCode).toBe(400);
	});

	it('Вход с некорректным логином', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/login',
			payload: {
				login: '123@admin.com',
				password: testPassword,
			},
		});

		expect(response.statusCode).toBe(401);
		expect(JSON.parse(response.payload)).toStrictEqual({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Неверный логин или пароль',
		});
	});

	it('Вход с некорректным паролем', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/login',
			payload: {
				login: testLogin,
				password: '1234',
			},
		});

		expect(response.statusCode).toBe(401);
		expect(JSON.parse(response.payload)).toStrictEqual({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Неверный логин или пароль',
		});
	});

	it('Регистрация без указания логина и пароля', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/signup',
			payload: {},
		});

		expect(response.statusCode).toBe(400);
	});

	it('Регистрация пользователя', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/signup',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		const payload = JSON.parse(response.payload);

		expect(response.statusCode).toBe(201);
		expect(payload.message).toBe('Пользователь успешно создан');
	});

	it('Повторная регистрация пользователя', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/signup',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		expect(response.statusCode).toBe(409);
		expect(JSON.parse(response.payload)).toStrictEqual({
			statusCode: 409,
			error: 'Conflict',
			message: 'Такой пользователь уже существует',
		});
	});

	it('Вход в аккаунт', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/login',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		const payload = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(payload.token).toBeDefined();
	});
});
