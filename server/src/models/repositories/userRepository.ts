import { IUser } from "../interfaces/IUser";
import { User } from "../schemas/userSchema";

export class UserRepository {
    findUserByEmail = async (email: String): Promise<IUser | null> => {
        return User.findOne({email})
    };

    createUser =  async (user: IUser): Promise<IUser> => {
        return new User(user).save();
    }
}