import { IUser } from "../models/interfaces/IUser";
import { UserRepository } from "../models/repositories/userRepository";
import { comparePassword, hashPassword } from "../utils/common";

export class AuthServices {
    private userRepo = new UserRepository();

    userRegistration = async (email: string, password: string): Promise<IUser> => {
        const hashedPassword = await hashPassword(password);
        const user = {
            email,
            password: hashedPassword
        }
        const newUser = await this.userRepo.createUser(user);
        return newUser;
    }

    userLogin = async (email: string, password: string): Promise<IUser | null> => {
        const user = await this.userRepo.findUserByEmail(email);
        if(!user) return null;

        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) return null;

        return user;
    }
}