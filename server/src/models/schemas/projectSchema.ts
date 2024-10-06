import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/IProject";

const ProjectSchema : Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const Project = mongoose.model<IProject & Document>('Project', ProjectSchema)