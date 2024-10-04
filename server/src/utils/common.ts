import bcrypt from 'bcrypt'
const saltRound = process.env.SALT_ROUND || 10;

export class httpStatus {
    INTERNAL_ERROR = 500;
    BAD_REQUEST = 400;
    NOT_FOUND = 404;
    UNAUTHORIZED = 401;
    CONFLICT = 409;
    SUCCESS = 200;
}

export class commonMessages {
    INTERNAL_ERORR = 'Internal Server Erorr';
    BAD_REQUEST = 'Bad Request';
    NOT_FOUND = 'Not Found';
    UNAUTHORIZED = 'Unautherised';
    SUCCESS = 'Ok';
}

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRound);
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);    
}