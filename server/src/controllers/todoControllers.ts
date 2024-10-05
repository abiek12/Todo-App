import { Request, Response } from "express";
import { commonMessages, httpStatus } from "../utils/common";
import { ProjectServices } from "../services/projectServices";
import { todoRepository } from "../models/repositories/todoRepository";

export class TodoControllers {
    private statusCode = new httpStatus;
    private messages = new commonMessages;
    private projectService = new ProjectServices();
    private todoRepo = new todoRepository();

    // Add todo to project
    addTodo = async (req: Request, res: Response) => {
        try {
            const {_id} = req.query;
            const {description} = req.body;
            if(!_id) {
                console.error("Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project) {
                console.error("Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const newTodo = await this.todoRepo.createTodo(description);
            project.todos.push(newTodo);

            console.info("Todo Created Successfully!");
            return res.status(this.statusCode.SUCCESS).send(project);

        } catch (error) {
            console.error("Error Creating Todo");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    // Update todo status
    updateTodo = async (req: Request, res: Response) => {
        try {
            const {status} = req.body;
            const {_id, todoId} = req.query;

            if(!_id || !todoId) {
                console.error("Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project) {
                console.error("Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const todo = await this.todoRepo.getTodoById(todoId as string);
            if(!todo) {
                console.error("Todo doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Todo doesn't exist!");
            }

            const updatedTodo = await this.todoRepo.editTodo(todoId as string, {status});
            if(updatedTodo) {
                console.info("Todo Status Updated Successfully!");
                return res.status(this.statusCode.SUCCESS).send(project);
            }
                        
        } catch (error) {
            console.error("Error Updating Todo");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }

    removeTodo = async (req: Request, res: Response) => {
        try {
            const {_id, todoId} = req.query;
            if(!_id || !todoId) {
                console.error("Mandatatory fields are missing!");
                return res.status(this.statusCode.BAD_REQUEST).send("Mandatory fields are missing!");
            }

            const project = await this.projectService.getSpecificProject(_id as string);
            if(!project) {
                console.error("Project doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Project doesn't exist!");
            }

            const todo = await this.todoRepo.getTodoById(todoId as string);
            if(!todo) {
                console.error("Todo doesn't exist!");
                return res.status(this.statusCode.NOT_FOUND).send("Todo doesn't exist!");
            }

            const deletedTodo = await this.todoRepo.deleteTodo(todoId as string);

            console.info("Todo Deleted Successfully!");
            return res.status(this.statusCode.SUCCESS).send("Todo Deleted Successfully!");
        } catch (error) {
            console.error("Error Deleting Todo");
            return res.status(this.statusCode.INTERNAL_ERROR).send(this.messages.INTERNAL_ERORR);
        }
    }
}