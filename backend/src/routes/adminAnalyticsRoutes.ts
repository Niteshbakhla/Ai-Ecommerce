import { Router } from "express";
import { auth, isAdmin } from "../middleware/auth";
import {
            overviewController,
            salesController,
            topProductsController,
            lowStockController,
            topCustomersController,
} from "../controllers/adminController";

const router = Router();

router.use(auth, isAdmin); // All routes below are admin protected

router.get("/overview", overviewController);
router.get("/sales", salesController);
router.get("/top-products", topProductsController);
router.get("/inventory", lowStockController);
router.get("/customers", topCustomersController);

export default router;
