import mongoose from 'mongoose';

export interface IProject extends Document {
  _id?: string;
  title: string;
  todos: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
