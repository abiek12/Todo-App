import { Request, Response } from "express";
import { commonMessages, createMarkdown, createPrivateGist, httpStatus } from "../utils/common";
import { ProjectServices } from "../services/projectServices";
import { UserRepository } from "../models/repositories/userRepository";
import mongoose from "mongoose";

export class ProjectControllers {
    private projectService = new ProjectServices();
    private statusCode = new httpStatus;
    private messages = new commonMessages;
    private userRepo = new UserRepository();

    createProject = async (req: Request, res: Response) => {
        try {
            const {title, todos} = req.body;
            const user = (req as any).user;
            const userId = new mongoose.Types.ObjectId(user.userId);
            if(!title) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const userData = await this.userRepo.findUserById(userId as any);
            if(!userData) {
                console.error("ERROR::User Not Found!");
                return res.status(this.statusCode.NOT_FOUND).send("User Not Found!");
            }

            const newProject = await this.projectService.createProject(req.body);
            if(newProject) {
                const updatedUser = await this.userRepo.updateUser(userId as any, newProject);
                if(updatedUser) {
                    console.info("INFO::Project Created Successfully!");
                    return res.status(this.statusCode.CREATED).send(newProject);
                }
            }
        } catch (error) {
            console.error("ERROR::Error Creating Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    getAllProjects = async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const userId = new mongoose.Types.ObjectId(user.userId);
            const userData = await this.userRepo.findUserById(userId as any);
            
            if(!userData) {
                console.error("ERROR::User Not Found!");
                return res.status(this.statusCode.NOT_FOUND).send("User Not Found!");
            };
            const allProjects = [];
            const projectList = userData.projects;
            
            if(projectList && projectList.length>0) {
                for (const project of projectList) {
                    const projectId = project._id.toString();
                    const projectData = await this.projectService.getSpecificProject(projectId);
                    allProjects.push(projectData);
                }
            }
            // const allProjects = await this.projectService.getAllProject();

            console.info("INFO::Project Fetched Successfully!");
            return res.status(this.statusCode.SUCCESS).send(allProjects);
        } catch (error) {
            console.error("ERROR::Error Fetching All Project", error);
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    getSpecificProject = async (req: Request, res: Response) => {
        try {
            const {_id} = req.params;
            if(!_id) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const projectById = await this.projectService.getSpecificProject(_id);
            if(!projectById) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            console.info("INFO::Project Fetched Successfully!");
            return res.status(this.statusCode.SUCCESS).send(projectById);
        } catch (error) {
            console.error("ERROR::Error Fetching Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    updateProject = async (req: Request, res: Response) => {
        try {
           const {title} = req.body;
           const {_id} =  req.params;
           if(!_id || !title) {
               console.error("ERROR::Mandatatory fields are missing!")
               return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
           } 

           const projectToUpdate = await this.projectService.updateProject(_id, req.body);
           if(!projectToUpdate) {
               console.error("ERROR::Project doesn't exist!");
               return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
           }

           console.info("INFO::Project Updated Successfully!");
           return res.status(this.statusCode.SUCCESS).send(projectToUpdate);

        } catch (error) {
            console.error("ERROR::Error Updating Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    deleteProject = async (req: Request, res: Response) => {
        try {
            const {_id} = req.params;
            const user = (req as any).user;
            const userId = new mongoose.Types.ObjectId(user.userId);
            if(!_id) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const projectById = await this.projectService.getSpecificProject(_id);
            if(!projectById || ! projectById._id) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }
            
            await this.projectService.deleteProject(projectById._id);
            await this.userRepo.deleteProjectFromUser(userId as any, projectById);
            console.info("INFO::Project Deleted Successfully!");
            return res.status(this.statusCode.SUCCESS).send("Project Deleted Successfully!");
        } catch (error) {
            console.error("ERROR::Error Deleting Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    exportAsGist = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            if(!projectId) {
                console.error("ERROR:: Project Id is missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Project Id is missing!");
            }

            const project: any = await this.projectService.getSpecificProject(projectId);
            if(!project) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const pendingTodos: any = project.todos.filter((todo: { status: boolean; }) => todo.status === false);
            const completedTodos: any = project.todos.filter((todo: { status: boolean; }) => todo.status === true);
            const projectTitle: string = project.title;

            const markdownContent: any = await createMarkdown(projectTitle, pendingTodos, completedTodos);
            const gistUrl = await createPrivateGist('Project Summary', markdownContent, projectTitle);

            console.info("INFO::Gist Created Successfully");
            return res.status(this.statusCode.SUCCESS).send(gistUrl);
        } catch (error) {
            console.error("ERROR::Error Deleting Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

}