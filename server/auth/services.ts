import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import userModel from '../models/user.model';

export type TokenData = {
    login: string;
}

export async function loginService(
    login: string,
    password: string,
): Promise<{ code: number, msg: Record<string, string> }> {
    const user = await userModel.findOne({ login });
    if (!user) {
        return {
            code: 401,
            msg: {
                error: 'Неверный логин или пароль',
            },
        };
    }

    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) {
        return {
            code: 401,
            msg: {
                error: 'Неверный логин или пароль',
            },
        };
    }

    const tokenData: TokenData = {
        login: user.login,
    };

    const token = jsonwebtoken.sign(tokenData, <string>process.env.SECRET_KEY, 
        { expiresIn: 60 * 60 });

    return {
        code: 200,
        msg: { token },
    };
}

export async function signupService(
    login: string,
    password: string,
): Promise<{ code: number, msg: Record<string, string> }> {
    const candidate = await userModel.findOne({ login });
    if (candidate) {
        return {
            code: 409,
            msg: {
                error: 'Такой пользователь уже существует',
            },
        };
    }

    const salt = bcrypt.genSaltSync(10);
    const userData = new userModel({
        login,
        password: bcrypt.hashSync(password, salt),
    });

    await userData.save();

    return {
        code: 201,
        msg: {
            message: 'Пользователь успешно создан',
        },
    };
}
