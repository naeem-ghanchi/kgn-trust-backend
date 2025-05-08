import { Router } from "express";
import userController from "../controllers/user.controller";
import gallaUserController from "../controllers/gallauser.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoutes = Router();
userRoutes.post("/galla-user", authMiddleware, gallaUserController.add);
userRoutes.get("/galla-user", authMiddleware, gallaUserController.get);

export { userRoutes };
