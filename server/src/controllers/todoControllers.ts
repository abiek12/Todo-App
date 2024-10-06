import { Request, Response } from "express";
import { commonMessages, httpStatus } from "../utils/common";
import { ProjectServices } from "../services/projectServices";
import { todoRepository } from "../models/repositories/todoRepository";
import { ProjectRepository } from "../models/repositories/projectRepository";

export class TodoControllers {
    private statusCode = new httpStatus;
    private messages = new commonMessages;
    private projectService = new ProjectServices();
    private todoRepo = new todoRepository();
    private projectRepo = new ProjectRepository();

    // Add todo to project
    addTodo = async (req: Request, res: Response) => {
        try {
            const {_id} = req.params;
            const {description} = req.body;
            if(!_id) {
                console.error("ERROR::Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project || !project._id) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const newTodo = await this.todoRepo.createTodo(req.body);
            if(newTodo && newTodo._id) {                
                const updatedProject = await this.projectRepo.updateProjectByTodo(project._id, newTodo)
                console.info("INFO::Todo Created Successfully!");
                return res.status(this.statusCode.SUCCESS).send(updatedProject);
            }
        } catch (error) {
            console.error("ERROR::Error Creating Todo", error);
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    // Update todo status
    updateTodo = async (req: Request, res: Response) => {
        try {
            const {todoId, status} = req.body;
            const {_id} = req.params;

            if(!_id || !todoId) {
                console.error("ERROR::Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const todo = await this.todoRepo.getTodoById(todoId as string);
            if(!todo) {
                console.error("ERROR::Todo doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Todo doesn't exist!");
            }

            const updatedTodo = await this.todoRepo.editTodo(todo._id as string, {status});
            if(updatedTodo) {
                console.info("INFO::Todo Status Updated Successfully!");
                return res.status(this.statusCode.SUCCESS).send(project);
            }
                        
        } catch (error) {
            console.error("ERROR::Error Updating Todo");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    removeTodo = async (req: Request, res: Response) => {
        try {
            const {_id} =  req.params;
            const {todoId} = req.query;
            if(!_id || !todoId) {
                console.error("ERROR::Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project || !project._id) {
                console.error("ERROR::Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const todo = await this.todoRepo.getTodoById(todoId as string);
            if(!todo) {
                console.error("ERROR::Todo doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Todo doesn't exist!");
            }

            await this.todoRepo.deleteTodo(todoId as string);
            await this.projectRepo.deleteTodoFromProject(project._id, todo);

            console.info("INFO::Todo Deleted Successfully!");
            return res.status(this.statusCode.SUCCESS).send("Todo Deleted Successfully!");
        } catch (error) {
            console.error("ERROR::Error Deleting Todo");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }
}