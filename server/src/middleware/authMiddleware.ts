import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../models/repositories/userRepository";
import { comparePassword } from "../utils/common";

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const userRepo = new UserRepository();
    const user = await userRepo.findUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    (req as any).user = user;
    next();
}