import { IUser } from "../models/interfaces/IUser";
import { UserRepository } from "../models/repositories/userRepository";
import { comparePassword, hashPassword } from "../utils/common";

export class AuthServices {
    private userRepo = new UserRepository();

    userRegistration = async (email: string, password: string): Promise<IUser> => {
        try {
            const hashedPassword = await hashPassword(password);
            const user = {
                email,
                password: hashedPassword
            }
            const newUser = await this.userRepo.createUser(user);
            return newUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    userLogin = async (email: string, password: string): Promise<IUser | "INVALID_PASSWORD" | null> => {
        try {
            const user = await this.userRepo.findUserByEmail(email);
            if(!user) return null;

            const isPasswordValid = await comparePassword(password, user.password);
            if(!isPasswordValid) return "INVALID_PASSWORD";

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}