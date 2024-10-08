import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const SALT_ROUND = process.env.SALT_ROUND || 10;

export class httpStatus {
    INTERNAL_ERROR = 500;
    BAD_REQUEST = 400;
    NOT_FOUND = 404;
    UNAUTHORIZED = 401;
    CONFLICT = 409;
    SUCCESS = 200;
    CREATED = 201;
}

export class commonMessages {
    INTERNAL_ERORR = 'Internal Server Erorr';
    BAD_REQUEST = 'Bad Request';
    NOT_FOUND = 'Not Found';
    UNAUTHORIZED = 'Unautherised';
    SUCCESS = 'Ok';
}

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUND);
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);    
}

export const generateAccessToken = async (userId: string): Promise<string> => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
}

export const generateRefreshToken = async (userId: string): Promise<string> => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}