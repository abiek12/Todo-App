import { Router } from "express";
import { ProjectControllers } from "../controllers/projectControllers";
import { TodoControllers } from "../controllers/todoControllers";
import { basicAuth } from "../middleware/authMiddleware";

const projectRouter = Router();
const projectController = new ProjectControllers();
const todoController =  new TodoControllers();

projectRouter.post("/create", basicAuth, projectController.createProject);
projectRouter.get("/", basicAuth, projectController.getAllProjects);
projectRouter.get("/:_id", basicAuth, projectController.getSpecificProject);
projectRouter.put("/:_id", basicAuth, projectController.updateProject);
projectRouter.delete("/:_id", basicAuth, projectController.deleteProject);

projectRouter.post("/:_id/todo", basicAuth, todoController.addTodo);
projectRouter.patch("/:_id/todo", basicAuth, todoController.updateTodo);
projectRouter.delete("/:_id/todo", basicAuth, todoController.removeTodo);

export default projectRouter;