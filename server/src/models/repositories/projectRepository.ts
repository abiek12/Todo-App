import { IProject } from "../interfaces/IProject";
import { Project } from "../schemas/projectSchema";

export class ProjectRepository {
    createProject = async (project: IProject): Promise<IProject> => {
        return await new Project(project).save();
    }

    findAllProject = async (): Promise<IProject[]> => {
        return await Project.find();        
    }

    findProjectById = async (_id: string): Promise<IProject | null> => {
        return await Project.findById(_id);        
    }

    updateProjectById = async (_id: string, update: Partial<IProject>): Promise<IProject | null> => {
        return await Project.findByIdAndUpdate(_id, update);
    }

    deleteProject = async (_id: string): Promise<void> => {
        await Project.findByIdAndDelete(_id);        
    }
}