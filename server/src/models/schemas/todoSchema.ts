import mongoose, { Schema } from "mongoose";
import { ITodo } from "../interfaces/ITodo";

const TodoSchema : Schema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const Todo = mongoose.model<ITodo & Document>('Todo', TodoSchema)