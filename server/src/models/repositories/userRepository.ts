import { IUser } from "../interfaces/IUser";
import { User } from "../schemas/userSchema";

export class UserRepository {
    findUserByEmail = async (email: String): Promise<IUser | null> => {
        return await User.findOne({email})
    };

    createUser =  async (user: IUser): Promise<IUser> => {
        return await new User(user).save();
    }
}