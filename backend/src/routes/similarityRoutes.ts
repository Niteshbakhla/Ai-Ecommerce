import { Router } from "express";
import { similarProductsController } from "../controllers/similarityController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/:productId", auth, similarProductsController);

export default router;
