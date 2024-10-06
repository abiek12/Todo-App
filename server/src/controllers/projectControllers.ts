import { Request, Response } from "express";
import { commonMessages, httpStatus } from "../utils/common";
import { todoRepository } from "../models/repositories/todoRepository";
import { ProjectServices } from "../services/projectServices";

export class ProjectControllers {
    private projectService = new ProjectServices();
    private todoRepo = new todoRepository();
    private statusCode = new httpStatus;
    private messages = new commonMessages;

    createProject = async (req: Request, res: Response) => {
        try {
            const {title, todos} = req.body;
            if(!title) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const newProject = await this.projectService.createProject(title);
            if(newProject) {
                const newTodo = await this.todoRepo.createTodo(todos);
                newProject.todos.push(newTodo);

                console.info("INFO::Project Created Successfully!");
                return res.status(this.statusCode.SUCCESS).send(newProject);
            }
        } catch (error) {
            console.error("ERROR::Error Creating Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    getAllProjects = async (req: Request, res: Response) => {
        try {
            const allProjects = await this.projectService.getAllProject();

            console.info("INFO::Project Fetched Successfully!");
            return res.status(this.statusCode.SUCCESS).send(allProjects);
        } catch (error) {
            console.error("ERROR::Error Fetching All Project");
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

           const projectToUpdate = await this.projectService.updateProject(_id, title);
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
            if(!_id) {
                console.error("ERROR::Mandatatory fields are missing!")
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.deleteProject(_id);
            console.info("INFO::Project Deleted Successfully!");
            return res.status(this.statusCode.SUCCESS).send("Project Deleted Successfully!");
        } catch (error) {
            console.error("ERROR::Error Deleting Project");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

}