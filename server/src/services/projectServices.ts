import { IProject } from "../models/interfaces/IProject";
import { ProjectRepository } from "../models/repositories/projectRepository";

export class ProjectServices {
    private projectRepo = new ProjectRepository();

    createProject = async (project: IProject): Promise<IProject> => {
        try {
            const projectData = await this.projectRepo.createProject(project);
            return projectData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllProject = async (): Promise<IProject[]> => {
        try {
            const allProjects = await this.projectRepo.findAllProject();
            return allProjects;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getSpecificProject = async (_id: string): Promise<IProject | null> => {
        try {
            const projectById = await this.projectRepo.findProjectById(_id);
            return projectById;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateProject = async (_id: string, update: Partial<IProject>): Promise<IProject | null> => {
        try {
            const projectToUpdate = await this.projectRepo.updateProjectById(_id, update);
            return projectToUpdate;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    deleteProject = async (_id: string): Promise<void> => {
        try {
            const project = await this.projectRepo.deleteProject(_id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}