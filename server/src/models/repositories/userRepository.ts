import { IProject } from "../interfaces/IProject";
import { IUser } from "../interfaces/IUser";
import { User } from "../schemas/userSchema";

export class UserRepository {
    findUserByEmail = async (email: String): Promise<IUser | null> => {
        return await User.findOne({email})
    };

    findUserById = async (_id: string): Promise<IUser | null> => {
        return await User.findById(_id)
    }

    createUser =  async (user: IUser): Promise<IUser> => {
        return await new User(user).save();
    }

    updateUser = async (_id: string, update: Partial<IProject>): Promise<IUser | null> => {
        return await User.findByIdAndUpdate(_id, { $push: {projects: update._id} },{ new: true });
    }

    deleteProjectFromUser = async (_id: string, update: Partial<IProject>): Promise<IUser | null> => {
        return await User.findByIdAndUpdate(_id, { $pull: {projects: update._id} },{ new: true });
    }
}