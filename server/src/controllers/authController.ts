import { Request, Response } from "express";
import { commonMessages, generateAccessToken, generateRefreshToken, httpStatus } from "../utils/common";
import { UserRepository } from "../models/repositories/userRepository";
import { AuthServices } from "../services/authServices";
import jwt from 'jsonwebtoken';

export class authControllers {
    private statusCode = new httpStatus;
    private messages = new commonMessages;
    private userRepo = new UserRepository();
    private authServices = new AuthServices();

    registration = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            if(!email || !password) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const exisitingUser = await this.userRepo.findUserByEmail(email);
            if(exisitingUser) {
                console.error("ERROR::User Already Exist!");
                return res.status(this.statusCode.BAD_REQUEST).send("User Already Exist!");
            }

            const newUser = await this.authServices.userRegistration(email, password);
            const msg = {
                message: "User Registered Successfully.",
                newUser
            }
            console.log("INFO::User Registered Successfully.");
            return res.status(this.statusCode.SUCCESS).send(msg)

        } catch (error) {
            console.error("ERROR::Error Registering User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    login = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try {
            if(!email || !password) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const user = await this.authServices.userLogin(email, password);

            if (user === "INVALID_PASSWORD") {
                console.error("ERROR::Invalid password!");
                return res.status(this.statusCode.UNAUTHORIZED).send("Invalid password!");
            }
            
            if(!user || !user._id) {
                console.error("ERROR::User doesn't exist!")
                return res.status(this.statusCode.NOT_FOUND).send("User doesn't exist!");
            }

            const accessToken: string = await generateAccessToken(user._id);
            const refreshToken: string = await generateRefreshToken(user._id); 

            console.log("INFO::User Login Successfully");
            return res.status(this.statusCode.SUCCESS).json({message:'Login Successful', accessToken, refreshToken});
        } catch (error) {
            console.error("ERROR::Error Logging In User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    loginWithRefreshToken = async (req: Request, res: Response) => {
        try {
            const {token} = req.body;
            if(!token) {
                console.error("ERROR::Token not found!");
                return res.status(this.statusCode.UNAUTHORIZED).send(this.messages.UNAUTHORIZED);
            }

            jwt.verify(token, process.env.JWT_SECRET || 'secret', async (err: any, user: any) => {
                if(err) {
                    console.error("ERROR::Error Logging In User with Refresh Token");
                    return res.status(this.statusCode.UNAUTHORIZED).send(this.messages.UNAUTHORIZED);
                }

                const accesstoken: string = await generateAccessToken(user._id);
                const refreshToken: string = await generateRefreshToken(user._id);

                console.info("INFO::User Login with Refresh Token Successfully");
                return res.status(this.statusCode.SUCCESS).json({message:'Login Successful', accesstoken, refreshToken});
            })
        } catch (error) {
            console.error("ERROR::Error Logging In User with Refresh Token");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }
}