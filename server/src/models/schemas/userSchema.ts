import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema: Schema =  new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now
    }
})

export const User = mongoose.model<IUser & Document>('User', UserSchema);