import mongoose from "mongoose";

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    projects?: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}