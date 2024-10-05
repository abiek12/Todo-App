import { Router } from "express";
import { authControllers } from "../controllers/authController";

const router = Router();
const authController = new authControllers();

router.post("/register", authController.registration);
router.post("/login", authController.login);

export default router;