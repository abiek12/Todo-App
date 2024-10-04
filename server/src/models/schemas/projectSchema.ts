import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/IProject";
import { Todo } from "./todoSchema";

const ProjectSchema : Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    todo:[Todo],
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