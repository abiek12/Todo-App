import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../models/repositories/userRepository";
import { comparePassword, httpStatus } from "../utils/common";
const statusCode = new httpStatus

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Missing or invalid authorization header' });
        }

        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            console.error("Token not found!");
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Missing or invalid authorization header' });
        }

        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
            if(err) {
                console.error(err);
                return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            (req as any).user = user;
            next();
        })

    } catch (error) {
        console.error(error);
        res.status(statusCode.INTERNAL_ERROR).send({ message: 'Error in auth' });
    }
}