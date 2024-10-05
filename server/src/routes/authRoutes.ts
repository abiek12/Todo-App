import { Router } from "express";
import { authControllers } from "../controllers/authController";

const authRouter = Router();
const authController = new authControllers();

authRouter.post("/register", authController.registration);
authRouter.post("/login", authController.login);

export default authRouter;