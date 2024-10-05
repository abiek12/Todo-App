import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../models/repositories/userRepository";
import { comparePassword, httpStatus } from "../utils/common";
const statusCode = new httpStatus

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Missing or invalid authorization header' });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');

        const userRepo = new UserRepository();
        const user = await userRepo.findUserByEmail(email);

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(statusCode.INTERNAL_ERROR).send({ message: 'Error in auth' });
    }
}