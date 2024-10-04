import { Request, Response } from "express";
import { commonMessages, httpStatus } from "../utils/common";
import { UserRepository } from "../models/repositories/userRepository";
import { AuthServices } from "../services/authServices";

const statusCode = new httpStatus
const messages = new commonMessages
const userRepo = new UserRepository();
const authServices = new AuthServices();

export const registration = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            console.error("Mandatatory fields are missing!")
            res.status(statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
        }

        const exisitingUser = await userRepo.findUserByEmail(email);
        if(exisitingUser) {
            console.error("User Already Exist!");
            res.status(statusCode.BAD_REQUEST).send("User Already Exist!");
        }

        const newUser = await authServices.userRegistration(email, password);
        const msg = {
            message: "User Registered Successfully.",
            newUser
        }
        console.log("User Registered Successfully.");
        res.status(statusCode.SUCCESS).send(msg)

    } catch (error) {
        console.error("Error Registering User");
        res.status(statusCode.INTERNAL_ERROR).send(messages.INTERNAL_ERORR);
    }
}