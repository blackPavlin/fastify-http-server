import mongoose from 'mongoose';
import server from '../server';

const testLogin = 'admin@admin.com';
const testPassword = 'admin';

describe('Тест авторизации', () => {
    beforeAll(async () => {
        await mongoose.connect(<string>process.env.MONGO_URL, { useUnifiedTopology: true, 
            useNewUrlParser: true, useCreateIndex: true
        });
    });

    afterAll(async (done) => {
        await server.close();
        mongoose.disconnect(done);
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

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(401);
        expect(payload.error).toBe('Неверный логин или пароль');
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

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(401);
        expect(payload.error).toBe('Неверный логин или пароль');
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

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(409);
        expect(payload.error).toBe('Такой пользователь уже существует');
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
        expect(!!payload.token).toBe(true);
    });
});
