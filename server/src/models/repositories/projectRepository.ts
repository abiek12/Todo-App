import { IProject } from "../interfaces/IProject";
import { ITodo } from "../interfaces/ITodo";
import { Project } from "../schemas/projectSchema";

export class ProjectRepository {
    createProject = async (project: IProject): Promise<IProject> => {
        return await new Project(project).save();
    }

    findAllProject = async (): Promise<IProject[]> => {
        return await Project.find().populate("todos");        
    }

    findProjectById = async (_id: string): Promise<IProject | null> => {
        return await Project.findById(_id).populate("todos");        
    }

    updateProjectById = async (_id: string, update: Partial<IProject>): Promise<IProject | null> => {
        return await Project.findByIdAndUpdate(_id, update);
    }

    updateProjectByTodo = async (_id: string, newTodo: ITodo): Promise<IProject | null> => {
        return await Project.findByIdAndUpdate(_id,{ $push: { todos: newTodo._id } },{ new: true })
    }

    deleteProject = async (_id: string): Promise<void> => {
        await Project.findByIdAndDelete(_id);        
    }
}