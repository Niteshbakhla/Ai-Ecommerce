import { Router } from "express";
import { createProductController, getProductController, productDeleteController, productUpdateController } from "../controllers/productController";
import { auth, isAdmin } from "../middleware/auth";

const router = Router();


router.route("/").post(auth, isAdmin, createProductController);
router.route("/").get(auth, getProductController);
router.route("/:id").delete(auth, isAdmin, productDeleteController);
router.route("/:id").patch(auth, isAdmin, productUpdateController);


export default router;