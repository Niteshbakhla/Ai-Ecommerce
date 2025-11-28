import { Router } from "express";
import { similarProductsController } from "../controllers/similarityController";

const router = Router();

router.get("/:productId", similarProductsController);

export default router;
