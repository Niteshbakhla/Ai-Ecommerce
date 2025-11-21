import { Router } from "express";
import { createProductController } from "../controllers/productController";
import { auth, isAdmin } from "../middleware/auth";

const router = Router();


router.route("/").post(auth, isAdmin, createProductController);


export default router;