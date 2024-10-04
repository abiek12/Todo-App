import mongoose, { Schema } from "mongoose";
import { ITodo } from "../interfaces/ITodo";

const TodoSchema : Schema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'],
        default: 'pending'
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