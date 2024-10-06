import { Request, Response } from "express";
import { commonMessages, generateAccessToken, generateRefreshToken, httpStatus } from "../utils/common";
import { UserRepository } from "../models/repositories/userRepository";
import { AuthServices } from "../services/authServices";

export class authControllers {
    private statusCode = new httpStatus;
    private messages = new commonMessages;
    private userRepo = new UserRepository();
    private authServices = new AuthServices();

    registration = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            if(!email || !password) {
                console.error("Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const exisitingUser = await this.userRepo.findUserByEmail(email);
            if(exisitingUser) {
                console.error("User Already Exist!");
                return res.status(this.statusCode.BAD_REQUEST).send("User Already Exist!");
            }

            const newUser = await this.authServices.userRegistration(email, password);
            const msg = {
                message: "User Registered Successfully.",
                newUser
            }
            console.log("User Registered Successfully.");
            return res.status(this.statusCode.SUCCESS).send(msg)

        } catch (error) {
            console.error("Error Registering User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    login = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try {
            if(!email || !password) {
                console.error("Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const user = await this.authServices.userLogin(email, password);
            if(!user || !user._id) {
                console.error("User doesn't exist!")
                return res.status(this.statusCode.NOT_FOUND).send("User doesn't exist!");
            }

            const accesstoken: string = await generateAccessToken(user._id);
            const refreshToken: string = await generateRefreshToken(user._id); 

            console.log("User Login Successfully");
            return res.status(this.statusCode.SUCCESS).json({message:'Login Successful', accesstoken, refreshToken});
        } catch (error) {
            console.error("Error Logging In User");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }
}