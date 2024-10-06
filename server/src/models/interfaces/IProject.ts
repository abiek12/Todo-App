import { ITodo } from './ITodo';

export interface IProject {
  _id?: string;
  title: string;
  todos: ITodo[];
  createdAt?: Date;
  updatedAt?: Date;
}
