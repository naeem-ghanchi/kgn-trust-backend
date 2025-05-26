import { Router } from "express";
import gallaAmountController from "../controllers/gallaamount.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const gallaAmountRoutes = Router();
gallaAmountRoutes.post("/galla-amount", authMiddleware, gallaAmountController.add);
gallaAmountRoutes.get("/galla-amount", authMiddleware, gallaAmountController.get);

export { gallaAmountRoutes };
