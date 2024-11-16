import { ITodo } from "../interfaces/ITodo";
import { Todo } from "../schemas/todoSchema";

export class todoRepository {
    createTodo = async (todo: ITodo): Promise<ITodo> => {
        return await new Todo(todo).save();
    }

    getTodoById =  async (_id: string): Promise<ITodo | null> => {
        return await Todo.findById(_id);
    }

    updateTodo = async (_id: string, update: Partial<ITodo>): Promise<ITodo | null> => {
        return await Todo.findByIdAndUpdate(_id, {status: update.status});
    }

    editTodo = async (_id: string, update: Partial<ITodo>): Promise<ITodo | null> => {
        return await Todo.findByIdAndUpdate(_id, {description: update.description});
    }

    deleteTodo = async (_id: string): Promise<void> => {
        await Todo.findByIdAndDelete(_id);
    }
}